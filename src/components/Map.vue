<template>
  <div id="container" v-if=true></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
  name: 'Map',  
  data:function(){
    return{
        
    }
  },
  computed:{
    datas(){
        return this.$store.state.list
    },
    datam(){
        return this.$store.state.station
    },
    datak(){
        return this.$store.state.datak
    }
  },
  watch:{
    datas(){
        // console.log("s")
        var positionx = JSON.parse(this.$store.state.list).features[0].geometry.coordinates[0][0];
        var positiony = JSON.parse(this.$store.state.list).features[0].geometry.coordinates[0][1];
         // 标准写法
        // 简写 var position = [116, 39]; 
        this.map.setCenter(new this.AMap.LngLat(positionx, positiony)); 

            if(this.labelsLayer){
                this.loca.remove(this.labelsLayer)
            }
            if(this.labelsLayerk){
                this.loca.remove(this.labelsLayerk)
            }
            this.loca.remove(this.layer)
            this.layer = new window.Loca.PulseLineLayer({
                    // loca,
                    zIndex: 10,
                    opacity: 1,
                    visible: true,
                    zooms: [2, 22],
            });
            if(this.labelsLayerm){
                    this.loca.remove(this.labelsLayerm)
            }
            // console.log(this.$store.state.liststation)
        // console.log(JSON.parse(this.$store.state.list))
            var geo = new window.Loca.GeoJSONSource(
                // url:'zhe.json'
            
                this.$store.state.list==""?{url:'zhe.json'}:{data:JSON.parse(this.$store.state.list)}
               
                
            );
            var headColors = ['#EFBB51', '#7F3CFF', '#4CC19B', '#0B5D74', '#E06AC4', '#223F9B', '#F15C1A', '#7A0FA6'];
            this.layer.setSource(geo);
            this.layer.setStyle({
                altitude: 0,
                lineWidth: 2,
                // 脉冲头颜色
                headColor: (_, feature) => {
                    return headColors[feature.properties.type - 1];
                },
                // 脉冲尾颜色
                trailColor: 'rgba(128, 128, 128, 0.5)',
                // 脉冲长度，0.5 表示一段脉冲占整条路的 1/4
                interval: 0.5,
                // 脉冲线的速度，几秒钟跑完整段路
                duration: 3000,
            });
            this.loca.add(this.layer);



            // 点...............................................
            var st ={"type":"FeatureCollection","features":[]}
           
            //  this.$store.state.liststation
            var mms;
            for(let i=0;i<this.$store.state.liststation.length;i++){
                var mm = {"type":"Feature","properties":{"name":"","address":""},"geometry":{"type":"Point","coordinates":[]}}
                mm.properties.name=this.$store.state.liststation[i].name
                
                mms=this.$store.state.liststation[i].location.split(",")
                
                mm.geometry.coordinates.push(mms[0]*1)
                mm.geometry.coordinates.push(mms[1]*1)
                mm.properties.address=`x:`+mms[0]*1+` `+ `y:`+mms[1]*1
                                                     
                st.features.push(mm)
            }
            // console.log(this.$store.state.liststation[0].name)
            //  st.features[1].properties.name="2"
            //  console.log(st)

            this.labelsLayer = (window.labelsLayer = new window.Loca.LabelsLayer({
            zooms: [2, 20],
            // collision:false
        }));

        var geos = new window.Loca.GeoJSONSource({
            // url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/charging_pile.json',
            // data:{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"高陆通充电站(文津国际公寓)","address":"中关村东路1号院5号楼"},"geometry":{"type":"Point","coordinates":[113.232889,23.078205]}},{"type":"Feature","properties":{"name":"国家电网汽车充电站(威盛大厦西北)","address":"中关村东路1号谷歌大厦门口"},"geometry":{"type":"Point","coordinates":[113.232969,23.070412]}}]}
            data:st
        });
        this.labelsLayer.setSource(geos);
        this.labelsLayer.setStyle({
            icon: {
                type: 'image',
                image: 'http://172.25.102.12:8080/i.png',
                size: [32, 32],
                anchor: 'center',
            },
            text: {
                // 每项配置都可使用回调函数来动态配置
                content: (index, feat) => {
                    return feat.properties.name;
                },
                style: {
                    fontSize: 12,
                    fontWeight: 'normal',
                    fillColor: '#5CDE8E',
                    strokeColor: '#000',
                    strokeWidth: 2,
                },
                direction: 'bottom',
            },
            extData: (index, feat) => {
                return feat.properties;
            },
        });
        this.loca.add(this.labelsLayer);

        this.labelsLayer.on('complete', () => {
            var normalMarker = new this.AMap.Marker({
                offset: [0, 0],
                zIndex:2
            });
            var labelMarkers = this.labelsLayer.getLabelsLayer().getAllOverlays();
            for (let marker of labelMarkers) {
                marker.on('mouseover', (e) => {
                    var position = e.data.data && e.data.data.position;

                    if (position) {
                        normalMarker.setContent(
                            `<div style="
                                color:#fff;
                                border: 1px solid #fff;
                                border-radius: 4px;
                                
                                margin-bottom:20px;
                                line-height: 20px;
                                padding:0 2px;
                                box-sizing: content-box;
                                font-size:12px ;">坐标：`+ marker.getExtData().address + '</div>',
                        );
                        normalMarker.setPosition(position);
                        this.map.add(normalMarker);
                    }
                });
                marker.on('mouseout', () => {
                    this.map.remove(normalMarker);
                });
            }
        });
        // ......
    },
    datam(){

        // 切换
        var xy=this.$store.state.location.split(",")

        // var positionx = JSON.parse(this.$store.state.list).features[0].geometry.coordinates[0][0];
        // var positiony = JSON.parse(this.$store.state.list).features[0].geometry.coordinates[0][1];
        //  // 标准写法
        // // 简写 var position = [116, 39]; 
        this.map.setCenter(new this.AMap.LngLat(xy[0]*1, xy[1]*1)); 
  


        // 渲染线
        var lists={"type":"FeatureCollection","features":[]}
        lists.features=this.$store.state.manylist

        // console.log(lists)


            if(this.labelsLayer){
                    this.loca.remove(this.labelsLayer)
                }
            if(this.labelsLayerm){
                    this.loca.remove(this.labelsLayerm)
                }
            this.loca.remove(this.layer)
            this.layer = new window.Loca.PulseLineLayer({
                    // loca,
                    zIndex: 10,
                    opacity: 1,
                    visible: true,
                    zooms: [2, 22],
            });
            // console.log(this.$store.state.liststation)
            // console.log(JSON.parse(this.$store.state.list))
            var geo = new window.Loca.GeoJSONSource(
            // url:'zhe.json'
            
                this.$store.state.lists==""?{url:'zhe.json'}:{data:lists}
               
                
            );
            var headColors = ['#EFBB51', '#7F3CFF', '#4CC19B', '#0B5D74', '#E06AC4', '#223F9B', '#F15C1A', '#7A0FA6'];
            this.layer.setSource(geo);
            this.layer.setStyle({
                altitude: 0,
                lineWidth: 2,
                // 脉冲头颜色
                headColor: (_, feature) => {
                    return headColors[feature.properties.type - 1];
                },
                // 脉冲尾颜色
                trailColor: 'rgba(128, 128, 128, 0.5)',
                // 脉冲长度，0.5 表示一段脉冲占整条路的 1/4
                interval: 0.5,
                // 脉冲线的速度，几秒钟跑完整段路
                duration: 3000,
            });
            this.loca.add(this.layer);

       
        

        // 标记点
        var st={"type":"FeatureCollection","features": [{"type":"Feature","properties":{"name":"","address":""},"geometry":{"type":"Point","coordinates":[]}}]}
        st.features[0].geometry.coordinates[0]=xy[0]*1;
        st.features[0].geometry.coordinates[1]=xy[1]*1;
        st.features[0].properties.name=this.$store.state.station
        st.features[0].properties.address = `x:`+xy[0]*1+` `+`y:`+xy[1]*1

       

         // 标记路线
         var stm={"type":"FeatureCollection","features": []}
         var listiocn=`{"s":[`
        for(let i=0;i<this.$store.state.manylist.length;i++){
            if(i==this.$store.state.manylist.length-1){
                listiocn = listiocn+`{"type":"Feature","properties":{"name":"`+this.$store.state.listname[i]+`","address":"`+this.$store.state.listname[i]+`"},"geometry":{"type":"Point","coordinates":[`+this.$store.state.manylist[i].geometry.coordinates[parseInt(this.$store.state.manylist[0].geometry.coordinates.length/2)][0]+","+ this.$store.state.manylist[i].geometry.coordinates[parseInt(this.$store.state.manylist[0].geometry.coordinates.length/2)][1]+"]}}]}"
            }else{
                listiocn = listiocn+`{"type":"Feature","properties":{"name":"`+this.$store.state.listname[i]+`","address":"`+this.$store.state.listname[i]+`"},"geometry":{"type":"Point","coordinates":[`+this.$store.state.manylist[i].geometry.coordinates[parseInt(this.$store.state.manylist[0].geometry.coordinates.length/2)][0]+","+ this.$store.state.manylist[i].geometry.coordinates[parseInt(this.$store.state.manylist[0].geometry.coordinates.length/2)][1]+"]}},"
            }
           
        //  this.$store.state.manylist[i].geometry.coordinates[parseInt(this.$store.state.manylist[0].geometry.coordinates.length/2)]
           
        }
        // console.log(listiocn)
        // console.log(JSON.parse(listiocn))
        listiocn=JSON.parse(listiocn)
        for(let i=0;i<listiocn.s.length;i++){
            stm.features.push(listiocn.s[i])
        }



        // 
        this.labelsLayer = (window.labelsLayer = new window.Loca.LabelsLayer({
            zooms: [2, 20],
            collision:false
        }));
        var geos = new window.Loca.GeoJSONSource({
            // url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/charging_pile.json',
            // data:{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"高陆通充电站(文津国际公寓)","address":"中关村东路1号院5号楼"},"geometry":{"type":"Point","coordinates":[113.232889,23.078205]}},{"type":"Feature","properties":{"name":"国家电网汽车充电站(威盛大厦西北)","address":"中关村东路1号谷歌大厦门口"},"geometry":{"type":"Point","coordinates":[113.232969,23.070412]}}]}
            data:st
        });
        this.labelsLayer.setSource(geos);
        this.labelsLayer.setStyle({
            icon: {
                type: 'image',
                image: 'http://172.25.102.12:8080/i.png',
                size: [32, 32],
                anchor: 'center',
            },
            text: {
                // 每项配置都可使用回调函数来动态配置
                content: (index, feat) => {
                    return feat.properties.name;
                },
                style: {
                    fontSize: 12,
                    fontWeight: 'normal',
                    fillColor: '#5CDE8E',
                    strokeColor: '#000',
                    strokeWidth: 2,
                },
                direction: 'bottom',
            },
            extData: (index, feat) => {
                return feat.properties;
            },
        });
        this.loca.add(this.labelsLayer);

        this.labelsLayer.on('complete', () => {
            var normalMarker = new this.AMap.Marker({
                offset: [0, 0],
                zIndex:2
            });
            var labelMarkers = this.labelsLayer.getLabelsLayer().getAllOverlays();
            for (let marker of labelMarkers) {
                marker.on('mouseover', (e) => {
                    var position = e.data.data && e.data.data.position;

                    if (position) {
                        normalMarker.setContent(
                            `<div style="
                                color:#fff;
                                border: 1px solid #fff;
                                border-radius: 4px;
                                
                                margin-bottom:20px;
                                line-height: 20px;
                                padding:0 2px;
                                box-sizing: content-box;
                                font-size:12px ;">坐标：`+ marker.getExtData().address + '</div>',
                        );
                        normalMarker.setPosition(position);
                        this.map.add(normalMarker);
                    }
                });
                marker.on('mouseout', () => {
                    this.map.remove(normalMarker);
                });
            }
        });
        // ......
        

        // 
        this.labelsLayerm = (window.labelsLayer = new window.Loca.LabelsLayer({
            zooms: [2, 20],
            // collision:false
        }));
        var geoss = new window.Loca.GeoJSONSource({
            // url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/charging_pile.json',
            // data:{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"高陆通充电站(文津国际公寓)","address":"中关村东路1号院5号楼"},"geometry":{"type":"Point","coordinates":[113.232889,23.078205]}},{"type":"Feature","properties":{"name":"国家电网汽车充电站(威盛大厦西北)","address":"中关村东路1号谷歌大厦门口"},"geometry":{"type":"Point","coordinates":[113.232969,23.070412]}}]}
            data:stm
        });
        this.labelsLayerm.setSource(geoss);
        this.labelsLayerm.setStyle({
            icon: {
                type: 'image',
                image: 'http://172.25.102.12:8080/listi.png',
                size: [32, 32],
                anchor: 'center',
            },
            text: {
                // 每项配置都可使用回调函数来动态配置
                content: (index, feat) => {
                    return feat.properties.name;
                },
                style: {
                    fontSize: 12,
                    fontWeight: 'normal',
                    fillColor: '#5CDE8E',
                    strokeColor: '#000',
                    strokeWidth: 2,
                },
                direction: 'bottom',
            },
            extData: (index, feat) => {
                return feat.properties;
            },
        });
        this.loca.add(this.labelsLayerm);

        this.labelsLayerm.on('complete', () => {
            var normalMarker = new this.AMap.Marker({
                offset: [0, 0],
                zIndex:2
            });
            var labelMarkers = this.labelsLayerm.getLabelsLayer().getAllOverlays();
            for (let marker of labelMarkers) {
                marker.on('mouseover', (e) => {
                    var position = e.data.data && e.data.data.position;

                    if (position) {
                        normalMarker.setContent(
                            `<div style="
                                color:#fff;
                                border: 1px solid #fff;
                                border-radius: 4px;
                                margin-bottom:20px;
                                line-height: 20px;
                                padding:0 2px;
                                width:80px;
                                box-sizing: content-box;
                                font-size:12px ;">路线：`+ marker.getExtData().address + '</div>',
                        );
                        normalMarker.setPosition(position);
                        this.map.add(normalMarker);
                    }
                });
                marker.on('mouseout', () => {
                    this.map.remove(normalMarker);
                });
            }
        });



    },
    datak(){
       
        if(this.labelsLayerk){
            this.loca.remove(this.labelsLayerk)
         }
           

        this.labelsLayerk = (window.labelsLayerk = new window.Loca.LabelsLayer({
            zooms: [2, 20],
            // collision:false
        }));
        
        var geoss = new window.Loca.GeoJSONSource({
            // url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/charging_pile.json',
            // data:{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"高陆通充电站(文津国际公寓)","address":"中关村东路1号院5号楼"},"geometry":{"type":"Point","coordinates":[113.232889,23.078205]}},{"type":"Feature","properties":{"name":"国家电网汽车充电站(威盛大厦西北)","address":"中关村东路1号谷歌大厦门口"},"geometry":{"type":"Point","coordinates":[113.232969,23.070412]}}]}
            data:this.$store.state.datak
        });

        
        this.labelsLayerk.setSource(geoss);
        this.labelsLayerk.setStyle({
            icon: {
                type: 'image',
                image: 'http://172.25.102.12:8080/buss.png',
                size: [32, 32],
                anchor: 'center',
            },
            text: {
                // 每项配置都可使用回调函数来动态配置
                content: (index, feat) => {
                    return feat.properties.name;
                },
                style: {
                    fontSize: 12,
                    fontWeight: 'normal',
                    fillColor: '#d81e06',
                    strokeColor: '#000',
                    strokeWidth: 2,
                },
                direction: 'bottom',
            },
            extData: (index, feat) => {
                return feat.properties;
            },
        });

        this.loca.add(this.labelsLayerk);

        this.labelsLayerk.on('complete', () => {
            var normalMarker = new this.AMap.Marker({
                offset: [0, 0],
                zIndex:2
            });
            var labelMarkers = this.labelsLayerk.getLabelsLayer().getAllOverlays();
            for (let marker of labelMarkers) {
                marker.on('mouseover', (e) => {
                    var position = e.data.data && e.data.data.position;

                    if (position) {
                        normalMarker.setContent(
                            `<div style="
                                color:#fff;
                                border: 1px solid #fff;
                                border-radius: 4px;
                                margin-bottom:20px;
                                line-height: 20px;
                                padding:0 2px;
                                width:80px;
                                box-sizing: content-box;
                                font-size:12px ;">路线：`+ marker.getExtData().address + '</div>',
                        );
                        normalMarker.setPosition(position);
                        this.map.add(normalMarker);
                    }
                });
                marker.on('mouseout', () => {
                    this.map.remove(normalMarker);
                });
            }

          })
    }
  },
  methods:{
    initMap(){
        AMapLoader.load({
            key:"b1e97fefb3008c05e4c470d60e50d2a1",   // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins:[''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            AMapUI: {
                    version: "1.1",
                    plugins: [],

                },
            Loca:{                // 是否加载 Loca， 缺省不加载
                "version": '2.0.0'  // Loca 版本，缺省 1.3.2
            },
        }).then((AMap)=>{
            this.AMap = AMap;
            this.map = new AMap.Map("container",{  //设置地图容器id
                viewMode:"3D",    //是否为3D地图模式
                zoom:13.5,           //初始化地图级别
                center:[113.331,23.078655], //初始化地图中心点位置
                showBuildingBlock: true, //
                mapStyle: 'amap://styles/darkblue', //设置地图的显示样式

            });
           
            var loca = new window.Loca.Container({
                map: this.map
            });
            this.loca = loca
             //脉冲头  
             var geo = new window.Loca.GeoJSONSource({
                url:'data.json'
             }
                
                // this.data==""?{url:'data2222.json'}:{data:JSON.parse(this.data)}

                // data:this.$store.state.list
                
                
            );

            this.layer = new window.Loca.PulseLineLayer({
                // loca,
                zIndex: 10,
                opacity: 1,
                visible: true,
                zooms: [2, 22],
            });

            var headColors = ['#EFBB51', '#7F3CFF', '#4CC19B', '#0B5D74', '#E06AC4', '#223F9B', '#F15C1A', '#7A0FA6'];

            // console.log('geo', geo);
            this.layer.setSource(geo);
            this.layer.setStyle({
                altitude: 0,
                lineWidth: 2,
                // 脉冲头颜色
                headColor: (_, feature) => {
                    return headColors[feature.properties.type - 1];
                },
                // 脉冲尾颜色
                trailColor: 'rgba(128, 128, 128, 0.5)',
                // 脉冲长度，0.5 表示一段脉冲占整条路的 1/4
                interval: 0.1,
                // 脉冲线的速度，几秒钟跑完整段路
                duration: 5000,
            });
            // console.log(this);
            loca.add(this.layer);
            loca.animate.start();
            
              //实时路况图层
            // var trafficLayer = new AMap.TileLayer.Traffic({
            //     zIndex: 10,
            //     zooms: [7, 22],
            // });

            // trafficLayer.setMap(this.map);
           

                



         


            }).catch(e=>{
                console.log(e);
            })

           

    },
},
  mounted(){
      //DOM初始化完成进行地图初始化
      this.initMap();
  }
}
</script>

<style  scoped>
    #container{
        padding:0px;
        margin: 0px;
        width: 100%;
        height: 100vh;
        
    }
    .cl{
        background-color: #fff;
        border: 1px solid #fff;
        border-radius: 4px;
        width: 80px;
        height: 20px;
        line-height: 20px;
        font-size:18px ;
        box-sizing: content-box;
    }
    
</style>
