<script>
    import { Storage } from "@capacitor/storage";
    import { logout } from "../auth/auth";
    import { push } from "svelte-spa-router";
    import Tile from "../components/tile.svelte";
    import Accessibility from "../components/accessibility.svelte";
    import Switch from "../components/switch.svelte";

    let screenReader = false;
    let session = null;
    let profilePic = null;
    let id = null;
    let saved = false;

    const getData = async () => {
        const data = await Storage.get({ key: "session" });
        session = JSON.parse(data.value);
        profilePic = await Storage.get({ key: "profilePic" });
        id = session.id;
    };

    getData();

    let tiles = [
        { icon: "assets/phone.png", name: "Set-up Phone" },
        { icon: "assets/map.png", name: "Access Map" },
        { icon: "assets/laptop.png", name: "Set-up Laptop" },
        { icon: "assets/google.png", name: "Google Suite" },
    ];

    let settings = [
        {
            icon: "accessibility_new",
            title: "Accessibility",
            component: Accessibility,
        },
        {
            icon: "notifications_active",
            title: "Notifications",
            //component: Notifications
        },
        {
            icon: "support_agent",
            title: "Support",
            //component: Support
        },
    ];

    let current = false;

    let active = true;

    let hide = () => {
        active = !active;
    };
</script>

<main>
    <div class="left">
        <div class="top">
            <div on:click={() => push("#/home")} class="header flex">
                <span class="material-icons">chevron_left</span>
                <img src="assets/logo.svg" alt="Optio.me Logo" />
            </div>

            <h1>My Profile</h1>

            {#if session && profilePic}
                <div class="profile flex">
                    <img
                        class="picture"
                        src={profilePic.value}
                        alt="User Profile"
                    />
                    <div class="info">
                        <h2>{session.displayName}</h2>
                        <h3>{session.userPrincipalName}</h3>
                    </div>
                </div>
            {/if}

            <div class="settings">
                {#each settings as setting}
                    <div
                        on:click={() => {
                            if (setting.component) current = setting.component;
                        }}
                        class="setting flex"
                    >
                        <div class="settingLeft flex">
                            <span class="material-icons">{setting.icon}</span>
                            <h4>{setting.title}</h4>
                        </div>

                        <span class="arrowRight material-icons"
                            >chevron_right</span
                        >
                    </div>
                {/each}
            </div>
        </div>

        <div class="footer">
            <button
                on:click={() => {
                    logout();
                }}>Sign Out</button
            >
            <span>Copyright &#169; 2021 Dimensions</span>
        </div>
    </div>

    <div class="right">
        {#if current}
            <svelte:component this={current} />
        {:else}
            <div class="screen flex">
                <div class="reader">
                    <Switch bind:checked={screenReader} />
                </div>

                {#each tiles as tile, id}
                    <div class="tile">
                        <Tile {tile} {id} />
                    </div>
                {/each}

                <img
                    class="illustration"
                    src="assets/discussion.png"
                    alt="Illustration"
                />
            </div>
        {/if}
    </div>
</main>

<style>
    main {
        display: flex;
        height: 100%;
    }

    .reader {
        position: absolute;
        right: 30px;
        top: 30px;
    }

    h1 {
        font-weight: 400;
        font-size: 36px;
        margin-bottom: 40px;
    }

    .header img {
        width: 170px;
        margin-left: 10px;
    }

    .header {
        margin-bottom: 40px;
    }

    .header span {
        color: #d36464;
        font-size: 50px;
        margin-left: -10px;
    }

    .left {
        width: 500px;
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .picture {
        width: 130px;
        border-radius: 50%;
        border: 2px solid #f1a947;
        padding: 7px;
        margin-right: 40px;
    }

    .right {
        background-color: white;
        flex: 1;
    }

    .info h2 {
        color: #6d6d6d;
    }

    .info h3 {
        color: #6d6d6d;
        font-size: 16px;
        font-weight: 400;
    }

    .setting {
        justify-content: space-between;
        margin-bottom: 15px;
    }

    .settingLeft {
        color: #5c5c5c;
    }

    .settingLeft span {
        font-size: 30px;
        margin-right: 20px;
    }

    .settings {
        margin: 60px 30px;
    }

    .arrowRight {
        color: #d36464;
        font-size: 40px;
    }

    button {
        background-color: #ea5959;
        border: none;
        padding: 20px 50px;
        color: white;
        font-size: 17px;
        border-radius: 20px;
        align-self: center;
        font-weight: 600;
    }

    .screen {
        justify-content: center;
        height: 100%;
        display: flex;
    }

    .illustration {
        width: 700px;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        bottom: 0;
    }

    .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .footer span {
        margin-top: 50px;
    }

    .tile {
        margin-right: 20px;
        margin-bottom: 90px;
    }
</style>
