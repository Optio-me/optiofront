import { Storage } from '@capacitor/storage';
import {push} from 'svelte-spa-router';
import { parse } from "qs"; // Replace
import UrlParser from 'query-string';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Http } from '@capacitor-community/http';

import * as cases from './cases';

const CODE_CHALLENGE = "k6xriiZ2GyIH9Dq-t490XLFlDCp0Qp54ZIDDELV45xw";

//shape of session
interface Session {
	displayName: String,
	givenName: String,
	id: String,
	userPrincipalName: String,
}

export const login = async () => {
	//launches browser or redirect in web

	//client id
	// d06c06bc-abf7-4abd-84c0-a21a36b3828f
	const b = await InAppBrowser.create(`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=d06c06bc-abf7-4abd-84c0-a21a36b3828f&response_type=code&redirect_uri=https%3A%2F%2Fwww.dimensions-uk.me%2F&response_mode=query&scope=https%3A%2F%2Fgraph.microsoft.com%2Fuser.read&code_challenge=${CODE_CHALLENGE}&code_challenge_method=S256`, '_self', 'clearcache=yes,clearsessioncache=yes')

	//native only
	b.on('loadstart').subscribe(async event => {
		let parsed = UrlParser.parseUrl(event.url);
		if (parsed.query.code) {
			console.log("VALID:", parsed.query.code)
			let validated = await validateToken(parsed.query);
			if (validated) push('/home');
			b.close();
		}
	})
}

export const logout = () => {
	Storage.remove({key: 'access_token'});
	push('/login');
}

export const validateToken = async (args: any) => {
	if (!args.code) return;

	let config = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		url: `${process.env.BACK_ADDR}`,
		data: {
			query: "mutation authenticate($code: String) { authenticate(code: $code) }",
			variables: {
				code: args.code,
			}
		}
	}

	let access_token = await Http.request(config).catch(e => {
		if (e.message.includes("NetworkError")) window.location.href = "/#/error/Disconnected"
		return e;
	});
	
	if (access_token.data.errors) {
		switch (access_token.data.errors[0].message) {
			case cases.INVALID_CODE:
				return false;
			case cases.USER_INSERT_FAIL:
				return false;
		}
	}

	await Storage.set({key: 'access_token', value: access_token.data.data.authenticate});
	return true;
}

export const session = async () => {
	const token = (await Storage.get({ key: 'access_token' })).value
	if (!token) return null;

	let config = {
		method: "POST",
		headers: {"Authorization" : token, "Content-Type": 'application/json'},
		url: `${process.env.BACK_ADDR}`,
		data: {
			query: `mutation { session { displayName, givenName, id, userPrincipalName } }`
		}
	}

	let session = await Http.request(config).catch(e => {
		if (e.message.includes("NetworkError")) window.location.href = "/#/error/Disconnected"
		return e
	});

	if (session.data) {
		if (session.data.errors) {
			switch (session.data.errors[0].message) {
				case cases.NO_AUTH:
					return null;
			}
		}

		if((await Storage.get({ key: "session" })).value == null){
			let req = {
				method: 'POST',
				headers: {"Authorization" : token, 'Content-Type': 'application/json'},
				url: `${process.env.BACK_ADDR}`,
				data: {
					query: "query ($id: String!){ getUser(id: $id){ info{ displayName, id, userPrincipalName }, admin, saved } }",
					variables: {
						id: session.data.data.session.id,
					}
				}
			}
	
			let userData = await Http.request(req).catch(e => {
				window.location.href = "/#/login"
				return e;
			});
			
			await Storage.set({key: 'session', value: JSON.stringify(userData.data.data.getUser.info)});
		}

		return session.data.data.session as Session;
	}
}

export const protectAuth = async (detail) => {
	let s = await session();
	if (s == null) {
		return false
	} else {
		return true
	}
}

export const protectLogin = async (detail) => {
	let s = await session();
	if (s == null) {
		return true;
	} else {
		return false;
	}
}