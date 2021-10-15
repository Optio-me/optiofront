import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import replace from "@rollup/plugin-replace";
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	inlineDynamicImports : true,
	output: {
		sourcemap: true,
		//sourcemap: !production,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	moduleContext: (id) => {
		// In order to match native module behaviour, Rollup sets `this`
		// as `undefined` at the top level of modules. Rollup also outputs
		// a warning if a module tries to access `this` at the top level.
		// The following modules use `this` at the top level and expect it
		// to be the global `window` object, so we tell Rollup to set
		// `this = window` for these modules.
		const thisAsWindowForModules = [
		  'node_modules/@ionic-native/in-app-browser/index.js'
		];
	  
		if (thisAsWindowForModules.some(id_ => id.trimRight().endsWith(id_))) {
		  return 'window';
		}
	},
	plugins: [
		replace({
			'preventAssignment': true,
			'process.env.BACK_ADDR' : JSON.stringify("https://www.dimensions-uk.me/actix"),
			'process.env.NODE_ENV': JSON.stringify( 'production' ),
			'bucket': JSON.stringify('https://d38fawr2ogy4vy.cloudfront.net/')
		}),
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
