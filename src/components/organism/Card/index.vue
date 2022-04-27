<template>
	<div class="card">
		<div class="card__inner" v-on:click="flipper" ref="card__inner">
			<div class="card__face card__face--front">
				<h2>{{PlayerTurn}}</h2>
			</div>
			<div class="card__face card__face--back">
				<div class="card__content">
					<div class="card__header">
						<img src="pp.jpg" alt="" class="pp" />
						<h2>Tyler Potts</h2>
					</div>
					<div class="card__body">
						<h3>Punishment</h3>
						<p>{{cardNumber.rule}}</p>
						<p>      <ul style="list-style: none;display: flex;float: right;">
        <li v-for="i in cardNumber.drink" :key="i"> 
            <img src="@/assets/bottle.png" height="60" />
        </li>
      </ul></p>
					</div>
				</div>
			</div>
		</div>
<div v-if ="cardNumber.spinBottle">
  <p>You Need to Spin The Bottle for this Task</p>
      <b-button v-b-modal.spin-bottle-modal>Spin The Modal</b-button>
</div>
  <b-modal id="spin-bottle-modal" title="BootstrapVue" ref="spin-bottle-modal" >
    <bottle-spin />
  </b-modal>
	</div>
</template>

<script>
import router from '@/router';
import { mapGetters } from "vuex";
import BottleSpin from '@/components/organism/BottleSpin';
export default {
	data(){return{
    val:2,
      PlayerTurn:'Player 1',
		isFlipped:false,
      cardNumber:{},
      PickedNumbers:[],
	}},
	props:{
		NumberOfPlayer:Number
	},
	components:{
		BottleSpin,
	},
created(){
//     const card = document.querySelector(".card__inner");

// card.addEventListener("click", function (e) {
//   card.classList.toggle('is-flipped');
// });
},
computed:{
    ...mapGetters("rules",["getCardRule"])
},
methods:{
    flipper(){
this.$refs.card__inner.classList.toggle('is-flipped');
if (this.isFlipped){this.isFlipped = false}
else {this.isFlipped = true;
	this.getRandomIntExcludingExistingNumbers()
}

    },
getRandomInt() {
   const minimum = Math.ceil(1);
   const maximum = Math.floor(this.getCardRule.length);

   return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
},
getRandomIntExcludingExistingNumbers() {
  let randomNumber;
  let excludeArrayNumbers = this.PickedNumbers;
  if(!Array.isArray(excludeArrayNumbers)) {
    randomNumber = this.getRandomInt();
    this.cardNumber= randomNumber;
    // if (this.cardNumber.spinBottle){
    //   this.$refs["spin-bottle-modal"].show();
    // }
  }

  do {
    randomNumber = this.getRandomInt();
  } while ((excludeArrayNumbers || []).includes(randomNumber));
  this.PickedNumbers.push(randomNumber)
  this.cardNumber = this.getCardRule.find(el => el.id == randomNumber)
    // if (this.cardNumber.spinBottle){
    //   this.$refs["spin-bottle-modal"].show();
    // }
  this.PlayerTurn = "Player" + this.val.toString()
    if (this.val < parseInt(this.NumberOfPlayer))
    {this.val +=1}
    else{
      this.val =1
    }
  if(this.PickedNumbers.length ==this.getCardRule.length){
	console.log("gameover");
	router.push({ name: 'game_over' });
	}
}
}
}
</script>

<style>
@import "../../../assets/css/CardMain.css"
</style>