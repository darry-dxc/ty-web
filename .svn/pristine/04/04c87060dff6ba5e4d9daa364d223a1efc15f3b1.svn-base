<template>
  <div>
    <div >
      <a-row :gutter="16" >
        <a-col :span="24">
          <a-card title="车辆信息(月)" hoverable>
            <a-month-picker @change="monthLineChange" slot="extra" placeholder="选择日期" :defaultValue="$moment()" :allowClear='false'/>
            <div ref="monthBrokenLineChart" style="width:100%;height:260px"></div>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="16" style="marginTop:22px">
        <a-col :span="12">
          <a-card title="车辆信息(周)" hoverable>
            <a-week-picker @change="weekLineChange" slot="extra" placeholder="选择日期" :defaultValue="$moment()" :allowClear='false'/>
            <div ref="weekBrokenLineChart" style="width:100%;height:260px"></div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="车辆信息(天)" hoverable>
            <a-date-picker @change="dayLineChange" slot="extra" placeholder="选择日期" :defaultValue="$moment()" :allowClear='false'/>
            <div ref="dayBrokenLineChart" style="width:100%;height:260px"></div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
const echarts = require('echarts')
const lineChartOptions = {
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value',
    axisLabel: { formatter: '{value} 辆' }
  },
}
export default {
  data () {
    return {
      lineChartDay: null,
      lineChartWeek: null,
      lineChartMonth: null,
      nickName: '',
      welcomeTime: '早上好',
      screenWidth: document.body.clientWidth
    }
  },

  components: {},

  created () {
    let role = sessionStorage.getItem('account')
    this.nickName = role
  },

  mounted () {
    let date = this.$moment() // 当前时间
    this.day = date.format('YYYY-MM-DD')
    this.week = date.format('YYYY-wo')
    this.month = date.format('YYYY-MM')
    const monthArr = []
    for (let i = 1; i < 32; i++) {
      monthArr.push(i)
    }
    const dayArr = []
    for (let i = 0; i < 7; i++) {
      dayArr.push(`${i * 3}时`)
    }
    this.lineChartDay = echarts.init(this.$refs.dayBrokenLineChart)
    this.lineChartDay.setOption(
      { ...lineChartOptions,
        xAxis: {
          data: dayArr
        },
        toolbox: {
          feature: {
            saveAsImage: {
              title: '保存',
              name: '车辆信息（天）'
            }
          }
        }
      }
    )
    this.lineChartWeek = echarts.init(this.$refs.weekBrokenLineChart)
    this.lineChartWeek.setOption(
      { ...lineChartOptions,
        xAxis: {
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        toolbox: {
          feature: {
            saveAsImage: {
              title: '保存',
              name: '车辆信息（周）'
            }
          }
        }
      }
    )
    this.lineChartMonth = echarts.init(this.$refs.monthBrokenLineChart)
    this.lineChartMonth.setOption(
      { ...lineChartOptions,
        xAxis: {
          data: monthArr
        },
        toolbox: {
          feature: {
            saveAsImage: {
              title: '保存',
              name: '车辆信息（月）'
            }
          }
        }
      }
    )
    this.fetchLineData('day', date.unix(), this.lineChartDay, 'dayBrokenLineChart')
    this.fetchLineData('week', date.unix(), this.lineChartWeek, 'weekBrokenLineChart')
    this.fetchLineData('month', date.unix(), this.lineChartMonth, 'monthBrokenLineChart')
    setTimeout(() => {
      this.lineChartDay.resize()
      this.lineChartWeek.resize()
      this.lineChartMonth.resize()
    }, 100)
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        this.screenWidth = window.screenWidth
      })()
    }
  },

  methods: {
    monthLineChange (date) {
      this.day = date.format('YYYY-MM-DD')
      this.fetchLineData('month', date && date.unix(), this.lineChartMonth, 'monthBrokenLineChart')
    },
    weekLineChange (date) {
      this.week = date.format('YYYY-wo')
      this.fetchLineData('week', date && date.unix(), this.lineChartWeek, 'weekBrokenLineChart')
    },
    dayLineChange (date) {
      this.month = date.format('YYYY-MM')
      this.fetchLineData('day', date && date.unix(), this.lineChartDay, 'dayBrokenLineChart')
    },
    /**
     * 请求折线图数据
     * @param timeUnit 时间单位：day, week, month, all
     * @param timeStamp 时间戳
     * @param lineChart 实例
     * @param ref 容器节点
     */
    fetchLineData (timeUnit, timeStamp, lineChart, ref) {
      let data = []
      this.$api.chart.lineChart({
        timeUnit: timeUnit,
        timeStamp: timeStamp
      }).then(res => {
        if (res.code === 200) {
          let pietitle = ''
            if(ref === 'dayBrokenLineChart') {
              pietitle = this.day + '车辆信息'
            }
            if(ref === 'weekBrokenLineChart') {
              pietitle = this.week + '车辆信息数据统计'
            }
            if(ref === 'monthBrokenLineChart') {
              pietitle = this.month + '月份车辆信息数据统计'
            }
          data = res.data[ref]
          if (data && data !== null) {
            let sumNum = []; let abNomalNum = []; let nomalNum = []
            Object.keys(data).map(key => {
              sumNum.push(data[key].sumNum)
              abNomalNum.push(data[key].abNomalNum)
              nomalNum.push(data[key].nomalNum)
            })
            lineChart.setOption({
              title: {
                text: pietitle
              },
              color: [ '#f5222d', '#52c41a' , '#1890ff' ],
              legend: {
                data: ['异常车次', '正常车次', '总车次'],
                right: 40
              },
              series: [{
                name: '异常车次',
                type: 'line',
                stack: '异常车次',
                data: abNomalNum,
                smooth: true,
                lineStyle: {
                  color: '#f5222d'
                }
              }, {
                name: '正常车次',
                type: 'line',
                stack: '正常车次',
                data: nomalNum,
                smooth: true,
                lineStyle: {
                  color: '#52c41a'
                }
              }, {
                name: '总车次',
                type: 'line',
                stack: '总车次',
                data: sumNum,
                smooth: true,
                lineStyle: {
                  color: '#1890ff'
                }
              }]
            })
          } else {
            lineChart.setOption({
              title: {
                text: pietitle,
                x:'center'
              },
              title: {
                text: '无数据'
              },
              legend: {
                data: []
              },
              series: [{
                data: []
              }]
            })
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    onChange () {

    }
  },
  watch: {
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        setTimeout(() => {
          this.lineChartDay.resize()
          this.lineChartWeek.resize()
          this.lineChartMonth.resize()
          this.timer = false
        }, 300)
      }
    }
  }
}

</script>
