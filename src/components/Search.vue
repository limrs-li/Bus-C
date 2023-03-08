<template>
  <div id="search">
    <!-- 上面搜索框 -->
    <div class="top">
      <input type="text" name="" id="" placeholder="搜索线路或站点" v-model="message" @keyup="searchkey">
      <b-icon-search class="ic"></b-icon-search>
        
       
    </div>

    <!-- 下面部分 -->
    <!-- 1 -->
    <div class="bottom" v-if="yes">
      <div class="divs">线路</div>
      <li v-for="(item, index)  in lists" :key="index" @mouseenter="enter" @mouseleave="leave" @click="listclick">
        {{ item.message }}
      </li>

      <div class="divs">站点</div>
      <div>
      <li v-for="(item, index)  in bustartionf" :key="index" @mouseenter="enter" @mouseleave="leave" @click="stationclick">
        {{ item.message }}
      </li>
      </div>
    </div>

    <!-- 2线路 -->
    <div class="bottoms" v-if="no">
      <div>
        <div class="twonub">{{title}}</div>
        <div class="two-middle">
          <div>{{start}}</div>
          <b-icon-arrow-left-right class="two-icon"></b-icon-arrow-left-right>
          <div>{{end}}</div>
        </div>
        <div class="two-long">{{distance}}</div>
      </div>
      <div class="time">6:30-22:00</div>
      <div class="stan">途径站点</div>
      
      <div class="towover">
        <li v-for="(item, index) in bustartion" :key="index" @mouseenter="enter" @mouseleave="leave" @click="stationclick">
        {{ item.message }}
      </li>
      </div>
    </div>

    <!-- 3站点 -->
    <div class="bottoms" v-if="yse">
      <div>
        <div class="threenub">{{ busname }}</div>
      </div>
      <div class="stanline">途径线路</div>

      <div class="towovers">
        <li v-for="(item, index)  in bustartions" :key="index" @mouseenter="enter" @mouseleave="leave" @click="listclick">
          {{ item.message }}
        </li>
      </div>

    </div>
    
  </div>
</template>

<script>
import datas from '../../public/data.json'
import stationjson from '../../public/datastation.json'
import listjson from '../../public/list.json'
import lists from '../../public/list22.json'
import liststation from '../../public/liststation.json'

import busp from '../../public/busp.json'
// import listtwojson from '../../public/list22.json'
export default {
  name: 'Search',
  components: {
    
  },                                                                                                                                                                                                                                                                             
  data:function(){
    return{
      message:"",
      lists:[{message:""},{message:""},{message:""},{message:""},{message:""}],
      bustartionf:[{message:""},{message:""},{message:""},{message:""},{message:""}],
      bustartion:[{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""}],
      bustartions:[{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""},{message:""}],
      yes:false,
      yse:false,
      no:false,
      start:"",
      end:"",
      title:"",
      distance:"",
      busname:""
      // color:"#fff"
    }
  },

  methods:{
    searchkey(){
  //  页面切换
    
  

    this.yes=true
    this.no = false
    this.yse = false
    if(!this.message){
        this.yes=false
    }

    var index =0
    var indexlist=0
    // 点
     for(let i=0;i<stationjson.length;i++){
      if(this.message==stationjson[i].slice(0,this.message.length)){
        // console.log(this.message)
        
        this.bustartionf[index].message=stationjson[i]
        index =index+1;
        if(index>4){
          break
        }
      }
     }
    //  线
     for(let i=0;i<listjson.length;i++){
      if(this.message==listjson[i].slice(0,this.message.length)){
        
        this.lists[indexlist].message=listjson[i]
        indexlist =indexlist+1;
        if(indexlist>4){
          break
        }
      }
     }
      
     
    },
    enter(e){
      // this.color = "yellow"
      e.target.style.backgroundColor = "rgb(220, 220, 220,0.5)"
     
    //  console.log( e.target.style)
    },
    leave(e){
      e.target.style.backgroundColor = "rgb(220, 220, 220,0)"
    
    },
    listclick(e){
     
      // 实时公交
      
      this.timebus(e.target.innerHTML.trim())
      // 切换
      this.no=true;
      this.yes=false;
      this.yse=false;
      var lis=[]

      // 清理数据
      for(let i=0;i<this.bustartion.length;i++){
        this.bustartion[i].message=""
      }
      for(let i=0;i<this.bustartions.length;i++){
        this.bustartions[i].message=""
      }


      // 
      for(let i=0;i<lists.length;i++){
        if(lists[i][3].trim()==e.target.innerHTML.trim()){
          this.start=lists[i][0];
          this.end=lists[i][1];
          this.title=lists[i][3].trim();
          this.distance=lists[i][2]+"km"

          for(let j=0;j<liststation.length;j++){
            if(liststation[j][0].name.trim()==lists[i][0] & liststation[j][liststation[j].length-1].name.trim()==lists[i][1]){
            for(let n=0;n<liststation[j].length;n++){
              this.bustartion[n].message=liststation[j][n].name;
              lis.push(liststation[j][n])
            }
            this.$store.dispatch('liststation',lis)
            break
            }

          }
          break
        }
      }
      
       // 发送
      //  console.log(lis[0].location)
      var a,b;
      // a=datas.features[0].geometry.coordinates[0][0]+","+datas.features[0].geometry.coordinates[0][1]
      // b=datas.features[0].geometry.coordinates[datas.features[0].geometry.coordinates.length][0]+","+datas.features[0].geometry.coordinates[datas.features[0].geometry.coordinates.length][1]
     
      // console.log(datas.features[0].geometry.coordinates)
       for(let i=0;i<datas.features.length;i++){
        a=datas.features[i].geometry.coordinates[0][0]+","+datas.features[i].geometry.coordinates[0][1]
        b=datas.features[i].geometry.coordinates[datas.features[i].geometry.coordinates.length-1][0]+","+datas.features[i].geometry.coordinates[datas.features[i].geometry.coordinates.length-1][1]
        if(a==lis[0].location&b==lis[lis.length-1].location){
          a =`{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"type":1},"geometry":{"type":"LineString","coordinates":`+ JSON.stringify(datas.features[i].geometry.coordinates)+"}}]}"
          // a=JSON.parse(a)
          this.$store.dispatch('list',a)
          // console.log(this.$store.state.list)
          break
        }
       }

      //  this.$store.dispatch('list',lis)
      
      

    },
    stationclick(e){
      this.no=false;
      this.yes=false;
      this.yse=true;

      var l =[]
      var first =[]
      var end = []
      var a;
      var b;
      // console.log(e.target.innerHTML)
      // 
      // 清空

      for(let i = 0;i<this.bustartions.length;i++){
        this.bustartions[i].message = ""
      }
      // 

      this.busname = e.target.innerHTML
      for(let i=0;i< liststation.length;i++){
      
        for(let j = 0;j<liststation[i].length;j++){
          if(e.target.innerHTML.trim() ==  liststation[i][j].name.trim()){
            // l.push(liststation[i][0].name)

            this.$store.dispatch("location",liststation[i][j].location)
            first.push(liststation[i][0].location)
            end.push(liststation[i][liststation[i].length-1].location)

            
            // 
            for(let n=0;n<lists.length;n++){
              if(liststation[i][0].name.trim()==lists[n][0]&liststation[i][liststation[i].length-1].name.trim()==lists[n][1]){
                l.push(lists[n][3].trim())
              }
            }

          }
        }
      }
      // console.log(l)
// 
      var lais=[]
      for(let i=0;i<datas.features.length;i++){
              a=datas.features[i].geometry.coordinates[0][0]+","+datas.features[i].geometry.coordinates[0][1]
              b=datas.features[i].geometry.coordinates[datas.features[i].geometry.coordinates.length-1][0]+","+datas.features[i].geometry.coordinates[datas.features[i].geometry.coordinates.length-1][1]
             for(let j=0;j<first.length;j++){
              if(a==first[j]&b==end[j]){
                // a =`{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"type":1},"geometry":{"type":"LineString","coordinates":`+ JSON.stringify(datas.features[i].geometry.coordinates)+"}}]}"
                // // a=JSON.parse(a)
                // this.$store.dispatch('list',a)
                // // console.log(this.$store.state.list)
                lais.push(datas.features[i])
                break
              }
             }
              
            }
      
      
      
      for(let i = 0;i<l.length;i++){
        this.bustartions[i].message = l[i]
      }
      
      // 发送
      // for(let i = 0;i<l.length;i++){
      //   l[i]
      // }

      this.$store.dispatch("manylist",lais)
      this.$store.dispatch("listname",l)
      this.$store.dispatch("station",e.target.innerHTML.trim())




    },
    timebus(){

    },
    timebuss(num){
      
      if(this.setinterval){
        clearInterval(this.setinterval)
      }
      // let num2 = num.replace(/[^\d]/g, " ");
      let num2=[]
      num=num.replace("(","--")
      num=num.replace(")","--")
      num=num.split("--")
      //  console.log(num[0].replace(/[^\d]/g," "))
      var dnum = "http://api.wxbus163.cn/z_busapi/BusApi.php?optype=luxian&uname=13790041484&cityid=85&keywords="+num[0].replace(/[^\d]/g," ").trim()+"&keySecret=c9fe015cb6c92371c47f3797bfd2a9b1"
      
      // console.log(dnum)
      var axios = this.axios
      var store = this.$store
      var pp
      this.setinterval = setInterval(function(){
              num2=[]
              axios.get(dnum).then((response) => {

              for(let i=0;i<response.data.returl_list.length;i++){
              if(response.data.returl_list[i].bus_endstan==num[2]&response.data.returl_list[i].bus_stastan==num[1]){
                num2.push(response.data.returl_list[i].bus_linestrid.trim())
                num2.push(response.data.returl_list[i].bus_linenum.trim())
                num2.push(response.data.returl_list[i].bus_staname)
              
                // console.log(response.data)
              // 请求公交点

              pp="http://api.wxbus163.cn/z_busapi/BusApi.php?optype=rtbus&uname=13790041484&cityid=85&bus_linestrid="+num2[0]+"&bus_linenum="+num2[1]+"&bus_staname="+num2[2]+"&keySecret=679c2f33d359ba873cd116b2344ee07e"
              // console.log("http://api.wxbus163.cn/z_busapi/BusApi.php?optype=rtbus&uname=15015610014&cityid=85&bus_linestrid=NDQwMTAwMDE2MjQ2&bus_linenum=440100&bus_staname=14&keySecret=306c3ea3fc9cc43fef29a1d2d07a1edc"==pp)
              
                axios.get(pp).then((response) => {
                  // /渲染实时数据
                  console.log(response.data)
                  // 点...............................................
                  var st ={"type":"FeatureCollection","features":[]}

                  //  console.log(st)
                  //  this.$store.state.liststation
                  for(let i=0;i<response.data.returl_list.buses.length;i++){
                      var mm = {"type":"Feature","properties":{"name":"","address":""},"geometry":{"type":"Point","coordinates":[]}}
                      mm.properties.name="公交车车"
                      mm.geometry.coordinates.push(busp.returl_list.buses[i].longing*1)
                      mm.geometry.coordinates.push(busp.returl_list.buses[i].lating*1)
                      mm.properties.address="距离第"+busp.returl_list.buses[i].dis_stat+"个站还有"+busp.returl_list.buses[i].distance+"米"                                                  
                      st.features.push(mm)
                  }
                  // console.log(this.$store.state.liststation[0].name)
                  //  st.features[1].properties.name="2"
                  console.log(st)
                  // st={"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"高陆通充电站(文津国际公寓)","address":"中关村东路1号院5号楼"},"geometry":{"type":"Point","coordinates":[113.232889,23.078205]}},{"type":"Feature","properties":{"name":"国家电网汽车充电站(威盛大厦西北)","address":"中关村东路1号谷歌大厦门口"},"geometry":{"type":"Point","coordinates":[113.232969,23.070412]}}]}


                  store.dispatch("datak",st)





              })

              break
            }

          }

        })

        
            
            
          },5000)

       




    }
  }
  }
</script>

<style scoped>
  #search{
    /* color: rgb(220, 220, 220); */
    position: fixed;
    z-index: 1;
    top: 20px;
    right: 0;
  }
  .top{
    position: relative;
    right: 38px;
    
  }
  .top input{
    height: 20px;
    width: 200px;
    padding:10px 12px;
    margin-left:64px;
    box-sizing:content-box;
    border: 1px solid rgb(165, 165, 165);
    border-radius:10px ;
  }
  .top input:focus{
    border: 1px solid sandybrown;
    outline: 1px solid sandybrown;
  }
  .ic{
    position: relative;
    /* top: 20px; */
    left: -30px;
    width: 18px;
    height: 18px;
     
  }
  .bottom{
    width:288px ;
    border: 1px solid rgb(165, 165, 165);
    border-radius:10px ;
    text-align: left;
    /* padding: 10px; */
    position: relative;
    right: 38px;
    top: 10px;
    font-size: 14px;
    background-color: #fff;
  }
  .bottoms{
    width:288px ;
    border: 1px solid rgb(165, 165, 165);
    border-radius:10px ;
    text-align: left;
    /* padding: 10px; */
    position: relative;
    right: 38px;
    top: 10px;
    font-size: 14px;
    /* height: 484px; */
    background-color: #fff;
  }
  .bottom .divs{
    font-size: 16px;
    color: rgb(150, 150, 150);
    margin-bottom:2px ;
    padding:6px 10px ;
  }
  .bottom li{
    width: 100%;
    list-style: none;
    margin: 4px 0;
    padding:5px 10px;
  } 
  .bottom div li{
    width: 100%;
    list-style: none;
    margin: 4px 0;
    padding:5px 10px;
  } 
  .bottoms li{
    /* width:110%; */
    list-style: none;
    /* margin:0 10px ; */
    /* margin:10px 0 ; */
    padding-left: 10px;
    line-height:30px ;
  }
  .two-middle{
    margin-top:5px ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 10px;
  }
  .two-icon{
    width: 12px;
    font-size: 12px;
    
  }
  .twonub{
    font-size: 18px;
    /* scale: 1.2; */
    padding:0 10px;
    padding-top:10px

  }
  .threenub{
    font-size: 18px;
    padding: 15px 10px;
    border-bottom:1px solid  rgb(150, 150, 150) ;   
  }
  .two-long{
    font-size: 14px;
    margin-bottom:10px;
    color: rgb(174, 174, 174);
    padding-left:10px
  }
  .towover{
    overflow: auto;
    height: 290px;
    width: 286px;
  }
  .towover::-webkit-scrollbar {
    width: 2px;
  }
  .towover::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 2px rgba(52, 30, 177, 0.871);
    opacity: 0.2;
    background: fade(red, 60%);
  }
  .towover::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: fade(red, 30%);
  }
  .towovers{
    overflow: auto;
    height: 380px;
    width: 287px;
  }
  .towovers::-webkit-scrollbar {
    width: 2px;
  }
  .towovers::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 2px rgba(52, 30, 177, 0.871);
    opacity: 0.2;
    background: fade(red, 60%);
  }
  .towovers::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: fade(red, 30%);
  }

  .time{
    background-color: rgba(77, 112, 255, 0.806);
    padding:5px 20px  ;
    width: 287px;
    position: relative;
    left: -10px;
    margin-bottom: 10px;
    margin-left:10px
  }
  .stan{
    color: rgb(174, 174, 174);
    margin-left:10px
  }
  .stanline{
    color: rgb(174, 174, 174);
    margin: 10px 0 5px 0;
    padding: 0 10px;
  }
</style>
