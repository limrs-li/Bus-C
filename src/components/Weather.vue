<template>
    <div class="t">
        <b-card
            title="广州"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 j"
            
        >
            <b-card-text>
            {{currentTime}}
            </b-card-text>
            <b-card-text>
                {{currentDesc}}—{{currentTemp}}
            </b-card-text>
        </b-card>
    </div>
</template>
  
  <script>

  
    export default {
        name: 'Weather',
        components: {
        
        },
        data(){
            return{
                currentTime:"",
                currentDesc:"",
                currentTemp:""
            }
        },
        mounted(){
            var axios =this.axios
            var that=this
            
                axios.get("weathers/trafficindex/overview/weather?cityCode=257").then((response) => {
                    
                    that.currentTime=response.data.data.currentTime
                    that.currentDesc=response.data.data.currentDesc
                    that.currentTemp=response.data.data.currentTemp
                })
          
           
        }
    }
  </script>
  
  <style scoped>
  .t{
    position: fixed;
    top:0;
    width:320px;
    
  }
  .j{
    border: 0;
    background-color:none
  }
  </style>
  