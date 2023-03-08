<template>
  <div id="app">
    <Map />
    <Search/>
    <Change/>
     <div class="all" v-if="ifm" >  
        <Weather/>
        <Listmessage/>
        <Cityroad/>
     </div>
    </div>
</template>

<script>
import Map from './components/Map.vue'
import Search from './components/Search.vue'
import Change from './components/Change.vue'
import Weather from './components/Weather.vue'
import Listmessage from './components/Listmessagess.vue'
// import Allnation from './components/Allnation.vue'
import Cityroad from './components/Cityroad.vue'

export default {
  name: 'App',
  components: {
    Map,
    Search,
    Weather,
    Listmessage,
    // Allnation,
    Cityroad,
    Change
  },
  methods:{

    
  },
  data(){
    return {
      ifm:false
    }
  },
  watch:{
    '$store.state.if'(newVal){
			//对数据执行操作
			this.ifm=newVal
		}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  width: 100%;
}
.all{
  position: fixed;
  top:0;
  /* left:-1500px; */
  width: 100%;
  height: 100%;
  background-color:rgba(255, 255, 255,1);
  z-index: 3;
}
</style>
