import React, { Component } from 'react';
import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { historySummary } from '@/services/summary';


interface HistoryProps {

}

interface HistoryState {
  x: [],
  confirmedData: [],
  suspectedData: [],
  deadData: [],
  curedData: []
}

class History extends Component<HistoryProps, HistoryState> {
  constructor(props: any) {
    super(props);
    this.state = {
      confirmedData: [],
      suspectedData: [],
      deadData: [],
      curedData: [],
      x: [],
    };
  }

  componentDidMount(): void {
    historySummary().then(response => {
      const x: any = [];
      const confirmedData: any = [];
      const suspectedData: any = [];
      const deadData: any = [];
      const curedData: any = [];
      // eslint-disable-next-line array-callback-return
      response.data.map((item: any) => {
        x.push(item.date);
        confirmedData.push(item.confirmed);
        suspectedData.push(item.suspected);
        deadData.push(item.dead);
        curedData.push(item.curedData);
      });
      this.setState({
        confirmedData,
        suspectedData,
        deadData,
        curedData,
        x
      })
    });
  }

  getOption = () => ({
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['确诊', '疑似', '死亡', '治愈'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: this.state.x,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '确诊',
        type: 'line',
        data: this.state.confirmedData,
      },
      {
        name: '疑似',
        type: 'line',
        data: this.state.suspectedData,
      },
      {
        name: '死亡',
        type: 'line',
        data: this.state.deadData,
      },
      {
        name: '治愈',
        type: 'line',
        data: this.state.curedData,
      }
    ],
  });

  render() {
    return <Card title='历史数据'>
      <ReactEcharts
        option={this.getOption()}
        notMerge
        lazyUpdate
        style={{ height: 700 }}
      />
    </Card>;
  }
}

export default History;
