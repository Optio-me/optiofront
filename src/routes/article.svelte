<script>
    import VideoPlayer from 'svelte-video-player';
    import SvelteMarkdown from 'svelte-markdown'
	import {fade} from 'svelte/transition';
	import Switch from "../components/switch.svelte";

    const poster = 'https://d38fawr2ogy4vy.cloudfront.net/images/thumb.png';
    const source = [
        'https://d38fawr2ogy4vy.cloudfront.net/videos/meet-tutorial.mp4'
    ];

    let currentStep = -1;
    let currentOnly = false;
    let screenReader = false;

    let example = {
        id: 1,
        icon: "assets/meet.png",
        name: "Setup and use Google Meet",
        thumb: "assets/thumb.png",
        description: "In this article, you will learn how to use Google Meet to speak with anyone, without needing to leave your home!",
        steps: [
            {
                text: "Visit the website [Google Meet](https://apps.google.com/meet)",
                timestamp: 39,
                images: ["assets/tutorial1.png"]
            },
            {
                text: "Click on the 'Sign In' button",
                timestamp: 74,
                images: ["assets/tutorial2.png", "assets/tutorial3.png"]
            },
            {
                text: "Type in your email address, or create an account",
                timestamp: 84,
                images: ["assets/tutorial4.png", "assets/tutorial5.png", "assets/tutorial6.png"]
            },
            {
                text: "Type in your password",
                timestamp: 94,
                images: ["assets/tutorial7.png"]
            },
            {
                text: "Start an instant meeting",
                timestamp: 360,
                images: ["assets/tutorial8.png", "assets/tutorial9.png"]
            }
        ]
    }
    let timestamps = example.steps.map((step) => step.timestamp);

    let getTime = (time) => { 
        timestamps.forEach((stamp, i) => {
            if(time[1] > stamp) currentStep = i;
            else if(time[1] < timestamps[0]) currentStep = -1
        });
    };
</script>

<main in:fade="{{duration: 300}}">
    <div class="left">
        <div class="content">
            <div class="header flex">
                <img src={example.icon} alt="Article Icon" />
                <h1>{example.name}</h1>
            </div>

            <div class="videoHolder">
                <VideoPlayer {getTime} color={'#EB6D79'} timeDisplay={true} {poster} {source} />
            </div>
    
            <div class="description flex">
                <span class="material-icons">description</span>
                <span>Description</span>
            </div>
            <span class="writing">{example.description}</span>

            <div class="switchHolder">
                <Switch bind:checked={screenReader} />
            </div>
        </div>
        
        <hr class="solid">
    </div>

        <div class="right">
            <div class="rightHeader flex">
                <h1>Step-by-Step</h1>
                <div on:click={()=> {currentOnly = !currentOnly}} class="current">
                    <span class="noselect">Current Step Only</span>
                    <input bind:checked={currentOnly} type="checkbox" id="step" name="Current Step">
                </div>
            </div>

            {#if currentOnly && currentStep !== -1}
                <div class="section">
                    <div class="summary flex">
                        <h2 class="circle flex"
                        style="border-color: #FF606F;">{currentStep + 1}</h2>
                        <SvelteMarkdown source={example.steps[currentStep].text} />
                    </div>
                    {#each example.steps[currentStep].images as image,x}
                    <img class="stepImage" src={image} alt="Figure {x}" />
                    {/each}
                </div>
            {:else}
                {#each example.steps as step, i}
                    <div class="section">
                        <div class="summary flex">
                            <h2 class="circle flex"
                            style={currentStep === i ? `border-color: #FF606F;` : 
                                                                `border-color: #B9B9B9;`}>{i+1}</h2>
                            
                            <SvelteMarkdown source={step.text} />
                        </div>
                        {#each step.images as image,x}
                        <img class="stepImage" src={image} alt="Figure {x}" />
                        {/each}
                    </div>
                {/each}
            {/if}
        </div>

</main>

<style>

    main {
        display: flex;
        height: 100%;
        padding: 40px;
        box-sizing: border-box;
        font-size: 18px;
    }


    .videoHolder{
        margin-top: 20px;
        margin-bottom: 10px;
        border-radius: 20px !important;
        overflow: hidden;
        box-shadow: 0px 4px 29px 5px rgba(0, 0, 0, 0.25);
    }

    .videoHolder {
        color: black !important;
    }

    .left {
        display: flex;

        flex-direction: row;
        max-width: 1200px;
        height: inherit;
        min-width: 800px;
    }


    @media only screen and (max-height: 700px) {

        .left {
            min-width: 500px;
        }
    }


    .right {
        overflow-y: scroll;
    }

    .content {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .header img {
        width: 60px;
    }

    .header h1 {
        font-size: 20px;
        margin-left: 30px;
    }

    .circle {
        border-radius: 50%;
        border: 3px solid;
        width: 50px;
        height: 50px;
        text-align: center;
        justify-content: center;
    }

    .summary {
        margin-bottom: 20px;
    }

    .summary h2{
        margin-right: 20px;
    }

    /* .summary h3 {
        font-weight: 500;
    } */

    .section img {
        width: 90%;
    }

    .stepImage {
        border-radius: 20px;
        margin-left: 10px;
        margin-bottom: 20px;
        box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.17);
    }

    hr.solid {
        border: 0;
        border-right: 1px solid #CBCBCB;
        margin: 0px 30px 0px 40px;
    }

    .description {
        margin: 30px 0px;
    }

    .description span:last-of-type {
        margin-left: 15px;
        font-weight: 600;
        font-size: 20px;
    }

    .writing {
        font-size: 18px;
        line-height: 30px;
    }

    .rightHeader {
        justify-content: space-between;
    }

    .current {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        border-radius: 10px;
        margin-right: 30px;
        border: 2px solid #ACACAC;
    }

    .current span {
        margin-right: 10px;
        font-weight: 600;
        font-size: 14px;
    }

    .current input {
        margin-top: 3px;
    }

    .right::-webkit-scrollbar {
        width: 12px;
	    background-color: #F5F5F5;
    }
    
    .right::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
    }
    
    .right::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #a1a1a1;
    }

    .switchHolder {
        margin-top: 30px;
    }

    .summary h2 {
        font-size: 21px;
    }
</style>