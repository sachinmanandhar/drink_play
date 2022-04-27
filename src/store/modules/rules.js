const state = () =>{
    return {
        CardRule:[{
            id:1,
            rule:"Call Your Second On the List",
            img_url:"rule_one",
            spinBottle:false,
            drink:2
        },
    {
        id:2,
        rule:"Twerk",
        img_url:"rule_two",
        spinBottle:false,
        drink:3
    },{
        id:3,
        rule:"Prank Anybody on Call",
        img_url:"rule_three",
        spinBottle:false,
        drink:1
    },{
        id:4,
        rule:"Kiss your Opposite",
        img_url:"rule_four",
        spinBottle:false,
        drink:1
    },
    {
        id:5,
        rule:"rule number 5",
        img_url:"rule_five",
        spinBottle:true,
        drink:3
    },
    {
        id:6,
        rule:"rule number 6",
        img_url:"rule_six",
        spinBottle:false,
        drink:2
    },
    {
        id:7,
        rule:"rule number 7",
        img_url:"rule_six",
        spinBottle:true,
        drink:2
    },
    {
        id:8,
        rule:"rule number 8",
        img_url:"rule_eight",
        spinBottle:true,
        drink:2
    }
]
    }
}
const getters = {
    getCardRule : (state) => state.CardRule
}
const actions = {
    async fetchCardRule({ commit },data ={}) {
        console.log(data)
        commit("SET_CARD_RULE", data);
    },   
}
const mutations = {
    SET_CARD_RULE:(state,data) => {
        state.CardRule.push(data) 
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};