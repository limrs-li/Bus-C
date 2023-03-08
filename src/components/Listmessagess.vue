<template>
    <div class="o" v-if=true>
        <div class="of" >
            <b-card-text class="t">
                <div class="fr">实时拥堵指数</div>
                <div>{{index}}</div>
                <div class="th">较上周同期上升{{weekrate}}</div>
            </b-card-text>
            <b-card-text class="t">
                <div class="fr">实时拥堵排行</div>
                <div>{{rank}}</div>
                <div class="th">全国重点城市排行</div>
            </b-card-text>
            <b-card-text class="t">
                <div class="fr">实时平均速度</div>
                <div>{{roadnetworkspeed}}</div>
                <div class="th">单位：km/h</div>
            </b-card-text>
            <b-card-text class="t">
                <div class="fr">实时严重拥堵里程</div>
                <div>{{yongdulength}}</div>
                <div class="th">单位：km</div>
            </b-card-text>
            <b-card-text class="t">
                <div class="fr">近30日最高拥堵指数</div>
                <div>{{monthmaxyongduindex}}</div>
                <div class="th">{{updatetime}}</div>
            </b-card-text>
           
        </div>
    </div>
</template>
  
  <script>

  
    export default {
        name: 'Listmessage',
        components: {
        
        },
        data(){
            return {
                index:"",
                weekrate:"",
                rank:"",
                roadnetworkspeed:"",
                yongdulength:"",
                monthmaxyongduindex:"",
                updatetime:""
            }
        },
        mounted(){
            var axios =this.axios
            var that=this

            // 优先展示
            axios.get("listmessage/trafficindex/city/details/?cityCode=257").then((response) => {
                    // console.log(response.data.data.detail.index)
                    that.index=response.data.data.detail.index;
                    that.weekrate=response.data.data.detail.week_rate
                    that.rank=response.data.data.detail.rank
                    that.roadnetworkspeed=response.data.data.detail.road_network_speed
                    that.yongdulength=response.data.data.detail.yongdu_length_4
                    that.monthmaxyongduindex=response.data.data.detail.month_max_yongdu_index.toFixed(2)
                    that.updatetime=response.data.data.updatetime.slice(0,4)+"年"+response.data.data.updatetime.slice(4,6)+"月"+response.data.data.updatetime.slice(6,8)+"日"
                })
            // 
            this.setInterval=setInterval(function(){
                axios.get("listmessage/trafficindex/city/details/?cityCode=257").then((response) => {
                    // console.log(response.data.data.detail.index)
                    that.index=response.data.data.detail.index;
                    that.weekrate=response.data.data.detail.week_rate
                    that.rank=response.data.data.detail.rank
                    that.roadnetworkspeed=response.data.data.detail.road_network_speed
                    that.yongdulength=response.data.data.detail.yongdu_length_4
                    that.monthmaxyongduindex=response.data.data.detail.month_max_yongdu_index.toFixed(2)
                    that.updatetime=response.data.data.updatetime.slice(0,4)+"年"+response.data.data.updatetime.slice(4,6)+"月"+response.data.data.updatetime.slice(6,8)+"日"
                })
            },5000)
        }
    }
  </script>
  
  <style scoped>
  .o{
    display: inline-block;
    position: fixed;
    left: 320px;
    
  }
  .of{
    padding:20px 0;
    display: flex;
    width: 320px;
    flex-direction: column;
    position: fixed;
    top: 150px;
    left: 0px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }
 .fr{
        font-size: 12px;
        font-weight: 900;
        color:rgba(0, 0, 0, 0.7)
    }
    .th{
        font-size: 12px;
        color: rgba(180, 180, 180, 0.8);
    }
    .t{
        /* width: 120px; */
        font-size: 24px;
        color:#5CDE8E;
        margin-left:0px ;
        margin-right:0px ;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-around; 
        align-items: center;
    }
    .fr-f{
        font-size: 16px;
        color: rgba(0, 0, 0, 0.8);
    }

  </style>
  