// import vuex from 'vuex';
import Vue from 'vue'
import Vuex from 'vuex'
// import data from '../../public/data2222.json'

Vue.use(Vuex)
const actions = {
    // searchtexta(context, vaule) {
        
    //     console.log(vaule)
    //     context.commit('searchtextm', vaule)
    // }
    list(context, vaule){
        // console.log(vaule)
        context.commit('listm', vaule)
    },
    liststation(context, vaule){
        // console.log(vaule)
        context.commit('liststationm', vaule)
    },
    station(context, vaule){
        // console.log( vaule)
        context.commit('stationm', vaule)
    },
    manylist(context, vaule){
        // console.log( vaule)
        context.commit('manylistm', vaule)
    },
    location(context, vaule){
        // console.log( vaule)
        context.commit('locationm', vaule)
    },
    listname(context, vaule){
        // console.log( vaule)
        context.commit('listnamem', vaule)
    },
    datak(context, vaule){
        // console.log( vaule)
        context.commit('datakm', vaule)
    },
    if(context, vaule){
        // console.log( vaule)
        context.commit('ifm', vaule)
    }




}
const mutations = {
    listm(state, value) {
        state.list = value
    },
    liststationm(state, value) {
        state.liststation = value
    },
    stationm(state, value){
        state.station = value
    },
     manylistm(state, value) {
        state.manylist = value
    },
    locationm(state, value){
        state.location = value
    },
    listnamem(state, value){
        state.listname = value
    },
    datakm(state, value){
        state.datak = value
    },
    ifm(state, value){
        state.if = value
    }




}
const state = {
    list:"",
    liststation:"",
    station:"",
    manylist:"",
    location:"",
    listname:"",
    datak:"",
    if:true
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
   
})