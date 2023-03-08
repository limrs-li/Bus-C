<template>
    <div class="t" @click="pande">
       <div class="f">数据面板</div>
    </div>
</template>
  
  <script>

  
    export default {
        name: 'Change',
        components: {
        
        },
        data(){
            return{
                if:false
            }
        },
        methods:{
            pande(){
                this.if=!this.if
               
                this.$store.dispatch("if",this.if)
               
            }
        },
        mounted(){
           
           
        }
    }
  </script>
  
  <style scoped>
  .t{
    position: fixed;
    bottom:40px;
    left: 0px;
    width:200px;
    height: 60px;
    background-color:rgb(250, 0, 0);
    border-radius:0 60px 60px 0 ;
    z-index: 5;
  }
  .f{
    line-height: 60px;
    font-weight: 900;
    font-size: 18px;
    color:#fff
  }
 
  </style>
  