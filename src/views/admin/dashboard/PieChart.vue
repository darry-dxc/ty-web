<template>
  <div>
    <div id="index_user_content">
      <a-row :gutter="16">
        <a-col :span="14">
          <a-card title="运输类型(月)" hoverable>
            <a-month-picker @change="monthPieChange" slot="extra" placeholder="选择日期" :defaultValue="$moment()" :allowClear='false'/>
            <div ref="monthPieChart" style="width:100%;height:600px"></div>
          </a-card>
        </a-col>
        <a-col :span="10" class="con-right">
          <div>
            <a-card title="运输类型(周)" hoverable>
              <a-week-picker @change="weekPieChange" slot="extra" placeholder="选择日期" :defaultValue="$moment()" :allowClear='false'/>
              <div ref="weekPieChart" style="width:100%;height:230px"></div>
            </a-card>
          </div>
          <div>
            <a-card title="运输类型(天)" hoverable >
              <a-date-picker @change="dayPieChange" slot="extra" placeholder="选择日期" :defaultValue="$moment()" :allowClear='false'/>
              <div ref="dayPieChart" style="width:100%;height:230px"></div>
            </a-card>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
const echarts = require('echarts')
const pieChartOptions = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: []
  },
  series: [{
    name: '运输类型',
    type: 'pie',
    radius: '55%',
    center: ['50%', '60%'],
    data: [],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    label: {
      normal:{
        formatter: '{b} : {c} ({d}%)'
      }
    }
  }]
}
export default {
  data () {
    return {
      pieChartDay: null,
      pieChartWeek: null,
      pieChartMonth: null,
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
    this.pieChartDay = echarts.init(this.$refs.dayPieChart)
    this.pieChartDay.setOption({
      ...pieChartOptions,
      toolbox: {
          feature: {
            saveAsImage: {
              title: '保存',
              name: '运输类型（天）'
            }
          }
        }
    })
    this.pieChartWeek = echarts.init(this.$refs.weekPieChart)
    this.pieChartWeek.setOption({
      ...pieChartOptions,
      toolbox: {
          feature: {
            saveAsImage: {
              title: '保存',
              name: '运输类型（周）'
            }
          }
        }
    })
    this.pieChartMonth = echarts.init(this.$refs.monthPieChart)
    this.pieChartMonth.setOption({
      ...pieChartOptions,
      toolbox: {
          feature: {
            saveAsImage: {
              title: '保存',
              name: '运输类型（月）'
            }
          }
        }
    })
    this.fetchPieData('day', date.unix(), this.pieChartDay, 'dayPieChart')
    this.fetchPieData('week', date.unix(), this.pieChartWeek, 'weekPieChart')
    this.fetchPieData('month', date.unix(), this.pieChartMonth, 'monthPieChart')
    setTimeout(() => {
      this.pieChartDay.resize()
      this.pieChartWeek.resize()
      this.pieChartMonth.resize()
    }, 100)
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        this.screenWidth = window.screenWidth
      })()
    }
  },

  computed: {},

  methods: {
    dayPieChange (date) {
      this.day = date.format('YYYY-MM-DD')
      this.fetchPieData('day', date && date.unix(), this.pieChartDay, 'dayPieChart')
    },
    weekPieChange (date) {
      this.week = date.format('YYYY-wo')
      this.fetchPieData('week', date && date.unix(), this.pieChartWeek, 'weekPieChart')
    },
    monthPieChange (date) {
      this.month = date.format('YYYY-MM')
      this.fetchPieData('month', date && date.unix(), this.pieChartMonth, 'monthPieChart')
    },
    /**
     * 请求饼图数据
     * @param timeUnit 时间单位：day, week, month, all
     * @param timeStamp 时间戳
     * @param pieChart 实例
     * @param ref 容器节点
     */
    fetchPieData (timeUnit, timeStamp, pieChart, ref) {
      let data = []; let seriesData = []; let legendData = []
      this.$api.chart.pieChart({
        timeUnit: timeUnit,
        timeStamp: timeStamp
      }).then(res => {
        if (res.code === 200) {
          let pietitle = {}
            if(ref === 'dayPieChart') {
              pietitle = this.day + '运输类型数据统计'
            }
            if(ref === 'weekPieChart') {
              pietitle = this.week + '运输类型数据统计'
            }
            if(ref === 'monthPieChart') {
              pietitle = this.month + '月份运输类型数据统计'
            }
          data = res.data[ref]
          if (data.length !== 0) {
            data.forEach((item, index) => {
              seriesData[index] = {
                value: item.number,
                name: item.typeName
              }
              legendData[index] = item.typeName
            })
            pieChart.setOption({
              title: {
                text: pietitle,
                x:'center'
              },
              legend: {
                data: legendData
              },
              series: [{
                data: seriesData
              }]
            })
          } else {
            pieChart.setOption({
              title: {
                text: pietitle,
                x:'center'
              },
              legend: {
                data: []
              },
              series: [{
                data: [{
                  name: '无数据',
                  value: 1
                }]
              }]
            })
          }
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  watch: {
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        setTimeout(() => {
          this.pieChartDay.resize()
          this.pieChartWeek.resize()
          this.pieChartMonth.resize()
          this.timer = false
        }, 300)
      }
    }
  }
}

</script>
<style scope>
  .con-right {
    height: 714px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
