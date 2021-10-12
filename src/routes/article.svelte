<script>
    let example = {
        id: 1,
        icon: "assets/meet.png",
        name: "Setup and use Google Meet",
        thumb: "assets/thumb.png",
        description: "In this article, you will learn how to use Google Meet to speak with anyone, without needing to leave your home!",
        steps: [
            {
                text: "Visit the website [Google Meet](apps.google.com/meet)",
                images: ["assets/tutorial1.png"]
            },
            {
                text: "Click on the 'Sign In' button",
                images: ["assets/tutorial2.png", "assets/tutorial3.png"]
            }
        ]
    }
</script>

<main>

    <div class="left">
        <div class="content">
            <div class="header flex">
                <img src={example.icon} alt="Article Icon" />
                <h1>{example.name}</h1>
            </div>
            <img class="thumb" src={example.thumb} alt="Video Thumbnail" />
    
            <div class="description flex">
                <span class="material-icons">description</span>
                <span>Description</span>
            </div>
            <span>{example.description}</span>
        </div>
        
        <hr class="solid">
    </div>

        <div class="right">
            <h1>Step-by-Step</h1>
            {#each example.steps as step, i}
                <div class="section">
                    <div class="summary flex">
                        <h2 class="circle flex">{i}</h2>
                        <h3>{step.text}</h3>
                    </div>
                    {#each step.images as image}
                     <img src={image} alt="Figure {i}" />
                    {/each}
                </div>
            {/each}
        </div>

</main>

<style>

    main {
        display: flex;
        /* flex-direction: row; */
        /* margin: 40px 40px 0px 40px; */
        height: 100%;
        padding: 40px;
        box-sizing: border-box;
    }

    .left {
        display: flex;

        flex-direction: row;
        max-width: 1200px;
        height: inherit;
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
        width: 80px;
    }

    .header h1 {
        font-size: 20px;
        margin-left: 30px;
    }

    .thumb {
        margin-top: 30px;
        width: inherit;
    }

    .circle {
        border-radius: 50%;
        border: 3px solid #FF606F;
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

    .summary h3 {
        font-weight: 500;
    }

    .section img {
        width: 100%;
    }

    hr.solid {
        border: 0;
        border-right: 1px solid #CBCBCB;
        margin: 0px 30px 0px 40px;
    }

    .description {
        margin: 30px 0px;
    }

</style>