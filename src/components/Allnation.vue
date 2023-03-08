<template>
    <div class="o">
        <b-list-group class="t">
            <div class="t-fr">实时拥堵排行</div>
            <div class="t-tw">
                <div>排名</div>
                <div>名称</div>
                <div>拥堵指数</div>
                <div>平均速度(km/h)</div>
            </div>
            <b-list-group-item class="fr t-tw" v-for="item in items" :key="item.message">
                <div style="position: relative;left:-20px;">{{item.index}}</div>
                <div style="position: relative;left:-23px;">{{item.name}}</div>
                <div style="position: relative;left:-40px;">{{item.num}}</div>
                <div style="position: relative;left:-30px;">{{item.qu}}</div>
            </b-list-group-item>
            
        </b-list-group>
    </div>
</template>
  
  <script>

  
    export default {
        name: 'Allnation',
        components: {
        
        },
        data(){
            return {
                items: [
                { index:1,name:"越秀区",num:1.405,qu:34.47},
                { index:1,name:"越秀区",num:1.405,qu:34.47},
                { index:1,name:"越秀区",num:1.405,qu:34.47},
                { index:1,name:"越秀区",num:1.405,qu:34.47},
                { index:1,name:"越秀区",num:1.405,qu:34.47},
                { index:1,name:"越秀区",num:1.405,qu:34.47},
                { index:1,name:"越秀区",num:1.405,qu:34.47},
                { index:1,name:"越秀区",num:1.405,qu:34.47},
                
                ]
            }
        }
    }
  </script>
  
  <style scoped>
    .o{
       position: fixed;
       left: 0px;
    }
    .t{
        width: 320px;
    }
    .t-fr{
        font-size: 20px;
        font-weight: 900;
        
    }
    .t-tw{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 48.8px;
    }
    .fr{
        width: auto;
        border: 0;
        border-top:1px solid black ;
    }
  </style>
  