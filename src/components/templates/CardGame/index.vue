<template>
  <b-container>
    <div v-if ="wantsToaddRule == null">
     <p> Play with the given rules?</p>
      <b-button style="margin-right:50px" @click ="wantsToaddRule=false">Play</b-button>
      <b-button @click ="wantsToaddRule=true">Add Rule</b-button>
    </div>
    <div v-if="wantsToaddRule == false">
    <div v-show="loading">
      <b-form @submit="onSubmit" v-if="show">
              <b-form-group
        id="input-group-1"
        label="Enter the Number of Player"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.NumberOfPlayer"
          type="number"
          placeholder="Enter Number of Player"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
    <div>
      <div class="text-center" v-show="loading">
  <b-spinner variant="primary"></b-spinner>
</div>
<div v-show="!loading">
  <card :NumberOfPlayer = "form.NumberOfPlayer" />
  <!-- <b-row class="justify-content-center" >
    <b-col  class="items" md="12" sm="12">
        <h3>Rule:{{cardNumber.rule}}</h3>
    </b-col>
    <b-col  class="items" md="12" sm="12" >
      <ul style="list-style: none;display: flex;float: right;">
        <li v-for="i in cardNumber.drink" :key="i"> 
            <img src="@/assets/bottle.png" height="60" />
        </li>
      </ul>
       -->
       <!-- <h3>Punishment Drinks :{{cardNumber.drink}}</h3> -->
    <!-- </b-col>
  </b-row> -->
  <!-- <b-button pill variant="outline-primary" @click = "getRandomIntExcludingExistingNumbers">Pick a Card</b-button> -->

</div>
<!-- <div v-if ="cardNumber.spinBottle">
  <p>You Need to Spin The Bottle for this Task</p>
      <b-button v-b-modal.spin-bottle-modal>Spin The Modal</b-button>
</div> -->
  <!-- <b-modal id="spin-bottle-modal" title="BootstrapVue" ref="spin-bottle-modal">
    <p class="my-4">Here Will Be the Spin The Bottle </p>
    <bottle-spin />
  </b-modal> -->
</div>

      <!-- <div v-show="!loading">{{getCardRule}}</div> -->


<!-- <div>
  <p>Whose Turn : {{PlayerTurn}}</p>
  <p>Picked Numbers : {{PickedNumbers}}</p>
</div> -->
</div>
<div v-if="wantsToaddRule">
    <b-form @submit="onAddRuleSubmit" @reset="onAddRuleReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Rule:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="Ruleform.rule"
          type="text"
          placeholder="Enter Rule"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Punishment:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="Ruleform.drink"
          type = "number"
          placeholder="Number of Drinks if Player Cant Do the Task"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Save and Play</b-button>
      <b-button type="reset" variant="danger">Add Another</b-button>
    </b-form>
</div>  
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Card from '@/components/organism/Card'
// import router from '@/router';
export default {
  data(){
    return {
      val:1,
      PlayerTurn:'',
        Ruleform: {
          rule: '',
          drink: 0,
        },
      wantsToaddRule:null,
      cardNumber:{},
      PickedNumbers:[],
      loading:true,
        form: {
          NumberOfPlayer: '', 
        },
      show: true
    }
  },
  components:{
        
        Card
  },
computed:{
    ...mapGetters("rules",["getCardRule"])
},

methods:{
  ...mapActions("rules",["fetchCardRule"]),
  onAddRuleSubmit(event){
event.preventDefault()
this.Ruleform.id = this.getCardRule.length + 1
this.fetchCardRule(this.Ruleform)
this.wantsToaddRule = false

  },
  onAddRuleReset(event){
event.preventDefault()
this.Ruleform.id = this.getCardRule.length + 1
this.fetchCardRule(this.Ruleform)
        this.Ruleform = {
          rule: '',
          drink: null,
        },

        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
  },
    onSubmit(event) {
    event.preventDefault()
    this.loading = false;
    this.PlayerTurn = "Player" + this.val.toString()
    this.val +=1
  },
  // Shuffle(){
    
  //   let min = 1
  //   let max = this.getCardRule.length
  //   var num = Math.floor(Math.random() * (max - min + 1)) + min;
  //   console.log(num,"new")
  //   this.PickedNumbers.forEach(el => {if (el==num){this.Shuffle()}})
  //   console.log(num,"new_new")
  //   this.PickedNumbers.push(num)
  //   this.cardNumber = this.getCardRule.find(el => el.id == num)
  //   console.log(this.val,parseInt(this.NumberOfPlayer))

  //   // return (num === 8 || num === 15) ? this.Shuffle() : num;
  // },
// getRandomInt() {
//    const minimum = Math.ceil(1);
//    const maximum = Math.floor(this.getCardRule.length);

//    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
// },
// getRandomIntExcludingExistingNumbers() {
//   let randomNumber;
//   let excludeArrayNumbers = this.PickedNumbers;
//   if(!Array.isArray(excludeArrayNumbers)) {
//     randomNumber = this.getRandomInt();
//     this.cardNumber= randomNumber;
//     // if (this.cardNumber.spinBottle){
//     //   this.$refs["spin-bottle-modal"].show();
//     // }
//   }

//   do {
//     randomNumber = this.getRandomInt();
//   } while ((excludeArrayNumbers || []).includes(randomNumber));
//   this.PickedNumbers.push(randomNumber)
//   this.cardNumber = this.getCardRule.find(el => el.id == randomNumber)
//     // if (this.cardNumber.spinBottle){
//     //   this.$refs["spin-bottle-modal"].show();
//     // }
//   this.PlayerTurn = "Player" + this.val.toString()
//     if (this.val < parseInt(this.form.NumberOfPlayer))
//     {this.val +=1}
//     else{
//       this.val =1
//     }
//   if(this.PickedNumbers.length ==this.getCardRule.length){router.push({ name: 'game_over' });}
// }
}
}
</script>

<style>

</style>