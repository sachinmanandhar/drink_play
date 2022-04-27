<template>
  <b-row>
        <!-- Main Container -->
        <div class="container">

            <!-- Arrow Image -->
            <div class="img-container">
                <img src="@/assets/arrow.png" id="arrow" alt="">
            </div>

            <!-- Spin Button -->
            <div class="btn-container">
                <b-button class="btn neon" id="btn" @click="startAnimation" >Spin</b-button>
            </div>
            
            <!-- Pop Up -hidden -->
            <div class="message-container hidden" id="pop-up">
                <p id="challange">This is where the pop-up message will be displayed</p>
                <b-button class="refresh-btn neon" @click="refreshBtn">Refresh</b-button>
            </div>
                
            <!-- End of Main Container -->
        </div>
  </b-row>
</template>

<script>
export default {
    data(){
        return {
wheelCounter:0,
lastSpin:'',
data:[]
        }
    },
    created(){

    },
    computed:{

    },
    methods:{
        displayChallange()
{
    // Add Pop Up
    let popUp = document.getElementById("pop-up");
    popUp.classList.remove("hidden");

},
refreshBtn()
{
     let popUp = document.getElementById("pop-up");
    let spinBtn = document.getElementById("btn");
    // Remove pop up
    popUp.classList.add("hidden");

    // Show Spin Btn
    spinBtn.classList.remove("hidden");
},
startAnimation()
{ 
    let spinBtn = document.getElementById("btn");
    let arrow = document.getElementById("arrow");
    // Hide Spin Btn
    spinBtn.classList.add("hidden");
	
    this.wheelCounter++;

    this.lastSpin = this.lastSpin + 1000 + Math.floor(Math.random() * 361);

    // For testing:
    console.clear()
    console.log("wheel spun: " + this.wheelCounter)

    // check to see how many times the wheel has been spun
    // bugs out after about 5 times
    if(this.wheelCounter > 5)
    {
        // Reset values and run again - prevents bugs
        this.lastSpin = 0;
        this.wheelCounter = 0;
        this.startAnimation();
    } 
    else
    {
        // Move the arrow business as usual
        arrow.style.transform = "rotate(" + this.lastSpin + "deg)";
    }

    // Get Question from data array
    let task = this.data[Math.floor(Math.random()*this.data.length)];
    // Add question to pop up window
    document.getElementById("challange").innerHTML = task.challenge;

    // Set timer for popUp
    setTimeout(this.displayChallange, 4000);

}
    }

}
</script>

<style>
@import "../../../assets/css/SpinBottleStyles.css"
/* "./assets/css/SpinBottleStyles.css" */
</style>