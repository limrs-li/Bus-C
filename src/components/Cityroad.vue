<template>
    <div class="m">
        <div class="t">
            <b-button-group vertical class="fr">
                    <b-button @click="now">城市道路实时拥堵</b-button>
                    <b-button @click="future">城市道路拥堵预测</b-button>
            </b-button-group>
        </div>
        
        <div class="f">
            <div ref="echarta" class="echarta"></div>
            <div ref="echartb" class="echartb"></div>

            <!-- 右边 -->
            <div class="oo">
                <b-list-group class="tt">
                    <div class="t-fr">明日拥堵路段预测</div>
                    <div class="t-tw">
                        <div>排名</div>
                        <div>名称</div>
                        <div>拥堵指数</div>
                        <div>平均速度(km/h)</div>
                    </div>
                    <b-list-group-item class="frr t-tw" v-for="(item,index) in items" :key="index">
                        <div style="padding-right: 5px;">{{index}}</div>
                        <div style="position: relative;left:-23px;">{{item.message}}</div>
                        <div style="position: relative;left:-40px;">{{item.num}}</div>
                        <div style="position: relative;left:-30px;">{{item.qu}}</div>
                    </b-list-group-item>
                
                </b-list-group>
            </div>


        </div>

        
        

    </div>
        

</template>
  
  <script>
    import * as echarts from 'echarts';
        
    export default {
                name: 'Cityroad',
                data(){
                    return {
                        datarow:[],
                        index:[],
                        hisIndex:[],

                        index2:[],
                        indexHis:[],
                        time:[],

                        items:[
                            {message:"0"}
                        ]
                    }
                },
                components: {
                

                },
                methods: {
                    now(){
                          // 请求数据
                    var axios =this.axios
                    var that=this
                   
                   

                        // 第一个请求
                        axios.get("cityroad/trafficindex/city/curve/?cityCode=257&type=minute&his=1").then((response) => {
                          
                            that.datarow=[]
                            that.index=[];
                            that.hisIndex=[];

                            for(let i=0;i<response.data.data.list.length;i++){
                                that.datarow.push(response.data.data.list[i].time)
                                that.index.push(response.data.data.list[i].index*1)
                                that.hisIndex.push(response.data.data.list[i].hisIndex*1)
                            }

                       
                           
                            
                    
                    var myChart = echarts.init(that.$refs.echarta);
                   
                    // 第一个图
                    // 仅在整个视图都被渲染之后才会运行的代码
                    
                    // 绘制图表


                    var option;

                    option = {
                        title: {
                            text: '当日24小时拥堵指数变化'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                            }
                        },
                        legend: {
                            data: ['今年指数', '去年指数']
                        },
                        toolbox: {
                            feature: {
                            saveAsImage: {}
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                            type: 'category',
                            boundaryGap: false,
                            data: that.datarow
                            }
                        ],
                        yAxis: [
                            {
                            type: 'value'
                            }
                        ],
                        series: [
                            {
                            name: '今年指数',
                            type: 'line',
                            stack: 'Total',
                            areaStyle: {},
                            emphasis: {
                                focus: 'series'
                            },
                            data:that.index
                            },


                            {
                            name: '去年指数',
                            type: 'line',
                            stack: 'Total',
                            areaStyle: {},
                            emphasis: {
                                focus: 'series'
                            },
                            data:that.hisIndex
                            },
                        ]
                        };

                        option && myChart.setOption(option);
                
                    })
                    // 第二个图
                         // 第二个请求
                        axios.get("cityroad/trafficindex/city/curvehistory/?cityCode=257&peakType=4&from=").then((response) => {
                            var myChartb = echarts.init(that.$refs.echartb);
                                
                            
                                that.time=[]
                                that.index2=[]
                                that.indexHis=[]

                                for(let i=0;i<response.data.data.list.length;i++){
                                    that.time.push(response.data.data.list[i].time)
                                    that.index2.push(response.data.data.list[i].index*1)
                                    that.indexHis.push(response.data.data.list[i].indexHis*1)
                                }

                            var options
                            options = {
                                title: {
                                    text: '近7天高峰拥堵指数变化',
                                    subtext: '拥堵指数'
                                },
                                tooltip: {
                                    trigger: 'axis'
                                },
                                legend: {
                                    data: ['今日指数', '去年指数']
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                    dataView: { show: true, readOnly: false },
                                    magicType: { show: true, type: ['line', 'bar'] },
                                    restore: { show: true },
                                    saveAsImage: { show: true }
                                    }
                                },
                                calculable: true,
                                xAxis: [
                                    {
                                    type: 'category',
                                    // prettier-ignore
                                    data:  that.time
                                    }
                                ],
                                yAxis: [
                                    {
                                    type: 'value'
                                    }
                                ],
                                series: [
                                    {
                                    name: '今日指数',
                                    type: 'bar',
                                    data: that.index2,
                                    markPoint: {
                                        data: [
                                        { type: 'max', name: 'Max' },
                                        { type: 'min', name: 'Min' }
                                        ]
                                    },
                                    markLine: {
                                        data: [{ type: 'average', name: 'Avg' }]
                                    }
                                    },
                                    {
                                    name: '去年指数',
                                    type: 'bar',
                                    data: that.indexHis,
                                    markPoint: {
                                        data: [
                                        { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
                                        { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
                                        ]
                                    },
                                    markLine: {
                                        data: [{ type: 'average', name: 'Avg' }]
                                    }
                                    }
                                ]
                                };

                                options && myChartb.setOption(options);


                        
                            })

                            
                            // 第三个请求
                        axios.get("cityroad/trafficindex/city/districtrank/?cityCode=257&roadtype=0").then((response) => {
                                                   
                                that.items=[]
                                for(let i=0;i<response.data.data.list.length;i++){
                                    
                                    var obj = {message:"",num:"",qu:""}
                                    obj.message = response.data.data.list[i].district_name
                                    obj.num=response.data.data.list[i].index
                                    obj.qu=response.data.data.list[i].speed
                                    that.items.push(obj)
                                    
                                }
                                //   console.log(that.items)

                        })
                        
                
                
              

                    },

                    future(){
                        console.log(2)
                    }

                },
                mounted: function () {
                
                this.$nextTick(function () {
                    this.now()

                    // 请求数据
                    var axios =this.axios
                    var that=this
                   
                    this.setInterval=setInterval(function(){

                        // 第一个请求
                        axios.get("cityroad/trafficindex/city/curve/?cityCode=257&type=minute&his=1").then((response) => {
                          
                            that.datarow=[]
                            that.index=[];
                            that.hisIndex=[];

                            for(let i=0;i<response.data.data.list.length;i++){
                                that.datarow.push(response.data.data.list[i].time)
                                that.index.push(response.data.data.list[i].index*1)
                                that.hisIndex.push(response.data.data.list[i].hisIndex*1)
                            }

                       
                           
                            
                    
                    var myChart = echarts.init(that.$refs.echarta);
                   
                    // 第一个图
                    // 仅在整个视图都被渲染之后才会运行的代码
                    
                    // 绘制图表


                    var option;

                    option = {
                        title: {
                            text: '当日24小时拥堵指数变化'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                            }
                        },
                        legend: {
                            data: ['今年指数', '去年指数']
                        },
                        toolbox: {
                            feature: {
                            saveAsImage: {}
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                            type: 'category',
                            boundaryGap: false,
                            data: that.datarow
                            }
                        ],
                        yAxis: [
                            {
                            type: 'value'
                            }
                        ],
                        series: [
                            {
                            name: '今年指数',
                            type: 'line',
                            stack: 'Total',
                            areaStyle: {},
                            emphasis: {
                                focus: 'series'
                            },
                            data:that.index
                            },


                            {
                            name: '去年指数',
                            type: 'line',
                            stack: 'Total',
                            areaStyle: {},
                            emphasis: {
                                focus: 'series'
                            },
                            data:that.hisIndex
                            },
                        ]
                        };

                        option && myChart.setOption(option);
                
                    })
                    // 第二个图
                         // 第二个请求
                        axios.get("cityroad/trafficindex/city/curvehistory/?cityCode=257&peakType=4&from=").then((response) => {
                            var myChartb = echarts.init(that.$refs.echartb);
                                
                            
                                that.time=[]
                                that.index2=[]
                                that.indexHis=[]

                                for(let i=0;i<response.data.data.list.length;i++){
                                    that.time.push(response.data.data.list[i].time)
                                    that.index2.push(response.data.data.list[i].index*1)
                                    that.indexHis.push(response.data.data.list[i].indexHis*1)
                                }

                            var options
                            options = {
                                title: {
                                    text: '近7天高峰拥堵指数变化',
                                    subtext: '拥堵指数'
                                },
                                tooltip: {
                                    trigger: 'axis'
                                },
                                legend: {
                                    data: ['今日指数', '去年指数']
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                    dataView: { show: true, readOnly: false },
                                    magicType: { show: true, type: ['line', 'bar'] },
                                    restore: { show: true },
                                    saveAsImage: { show: true }
                                    }
                                },
                                calculable: true,
                                xAxis: [
                                    {
                                    type: 'category',
                                    // prettier-ignore
                                    data:  that.time
                                    }
                                ],
                                yAxis: [
                                    {
                                    type: 'value'
                                    }
                                ],
                                series: [
                                    {
                                    name: '今日指数',
                                    type: 'bar',
                                    data: that.index2,
                                    markPoint: {
                                        data: [
                                        { type: 'max', name: 'Max' },
                                        { type: 'min', name: 'Min' }
                                        ]
                                    },
                                    markLine: {
                                        data: [{ type: 'average', name: 'Avg' }]
                                    }
                                    },
                                    {
                                    name: '去年指数',
                                    type: 'bar',
                                    data: that.indexHis,
                                    markPoint: {
                                        data: [
                                        { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
                                        { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
                                        ]
                                    },
                                    markLine: {
                                        data: [{ type: 'average', name: 'Avg' }]
                                    }
                                    }
                                ]
                                };

                                options && myChartb.setOption(options);


                        
                            })

                            
                            // 第三个请求
                        axios.get("cityroad/trafficindex/city/districtrank/?cityCode=257&roadtype=0").then((response) => {
                                                   
                        that.items=[]
                          for(let i=0;i<response.data.data.list.length;i++){
                            
                            var obj = {message:"",num:"",qu:""}
                              obj.message = response.data.data.list[i].district_name
                              obj.num=response.data.data.list[i].index
                              obj.qu=response.data.data.list[i].speed
                              that.items.push(obj)
                             
                          }
                        //   console.log(that.items)

                })
                
                
                
                },20000)


                })


               



                
            }
        }
  </script>
  
  <style scoped>
    
    .t{
        position: fixed;
        top:700px;
        left:0px
    }
    .fr{
        display: inline-block;
        width:320px
    }
    .f{
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100vh;
        position: fixed;
        margin: auto;
        left: 0;
        right: 0;
        top: 40px;
        /* height: 100vh; */
    }
    .echarta{
        width:800px;
        height: 400px;
        margin-bottom: 40px;
        /* position: fixed;
        margin: auto;
        left: 0;
        right: 0;
        top: 0; */
    }
    .echartb{
        width:800px;
        height: 400px;
        /* position: fixed;
        margin: auto;
        left: 0;
        right: 0;
        top:0;  */
    }


    .oo{
       position: fixed;
       right: 0px;
       top:144px
    }
    .tt{
        width: 320px;
    }
    .t-fr{
        font-size: 20px;
        font-weight: 900;
        
    }
    .t-tw{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 48.8px;
        padding: 0;
    }
    .frr{
        width: auto;
        border: 0;
        border-top:1px solid black ;
    }
  </style>
  