import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ReactEcharts from 'echarts-for-react';
import { chinaDaily, summaryChina } from '@/services/summary';
import { Card, Col, Icon, Row, Statistic } from 'antd';
import Detail from '@/pages/epidemic/detail';
import History from '@/pages/epidemic/history';


require('echarts/map/js/china');

interface EpidemicProps {
}

interface EpidemicState {
  data: any;
  confirmed: number;
  cured: number;
  dead: number;
  suspected: number;
  add_confirmed: number;
  add_cured: number;
  add_dead: number;
  add_suspected: number;
}

class Epidemic extends Component<EpidemicProps, EpidemicState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      confirmed: 0,
      cured: 0,
      dead: 0,
      suspected: 0,
      add_confirmed: 0,
      add_cured: 0,
      add_dead: 0,
      add_suspected: 0,
    };
  }

  componentDidMount(): void {
    summaryChina().then(response => {
      const provinceLevel: any = response.data.province_level;
      const provinces: any = { ...response.data.provinces };
      const data: any = [];
      const colors: any = ['rgba(252, 56, 57, 0.10)', 'rgba(255, 0, 0, 0.30)', 'rgba(255, 0, 0, 0.40)',
        'rgba(255, 0, 0, 0.50)', 'rgba(255, 0, 0, 0.65)', 'rgba(255, 0, 0, 0.98)'];
      // eslint-disable-next-line array-callback-return
      Object.keys(provinceLevel).map((item: any) => {
        const reg = {
          name: item,
          itemStyle: {
            areaColor: colors[provinceLevel[item]],
            color: colors[provinceLevel[item]],
          },
          value: provinces[item],
        };
        data.push(reg);
      });
      data.push(
        {
          name: '南海诸岛',
          value: {
            confirmed: 0,
            dead: 0,
            cured: 0,
            suspected: 0,
          },
        },
      );
      this.setState({ data });
    });
    chinaDaily().then(response => {
      const data: any = { ...response.data };
      this.setState({
        confirmed: data.confirmed,
        cured: data.cured,
        dead: data.dead,
        suspected: data.suspected,
        add_confirmed: data.add_confirmed,
        add_cured: data.add_cured,
        add_suspected: data.add_suspected,
        add_dead: data.add_dead,
      });
    });
  }

  getOption = () => ({
    backgroundColor: 'transparent',
    title: {
      text: '疫情地图',
      left: 'center',
      textStyle: {
        color: '#ff4648',
        fontSize: 24,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if(params === undefined || params.data === undefined){
          return 0;
        }
        const data: any = { ...params.data.value };
        return `${params.name}<br/>`
          + `确诊：${data.confirmed}<br/>`
          + `治愈：${data.cured}<br/>`
          + `死亡：${data.dead}<br/>`
          + `疑似：${data.suspected}`;
      },
    },
    series: [
      {
        type: 'map',
        name: '疫情统计',
        coordinateSystem: 'geo',
        label: {
          show: false,
        },
        map: 'china',
        itemStyle: {
          color: '#ddb926',
        },
        data: this.state.data,
      },
    ],
  });

  render() {
    return <PageHeaderWrapper title={false}>
      <Row>
        <Col span={6}>
          <Card>
            <Statistic
              title={
                <>
                  确诊(
                  <span style={{ color: '#F1403C' }}>
                    <Icon type='arrow-up'/>{this.state.add_confirmed}
                  </span>
                  )
                </>
              }
              value={this.state.confirmed}
              valueStyle={{ color: '#F1403C' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={
                <>
                  疑似(
                  <span style={{ color: '#FF9607' }}>
                    <Icon type='arrow-up'/>{this.state.add_suspected}
                  </span>
                  )
                </>
              }
              value={this.state.suspected}
              valueStyle={{ color: '#FF9607' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={
                <>
                  死亡(
                  <span style={{ color: '#8590A6' }}>
                    <Icon type='arrow-up'/>{this.state.add_dead}
                  </span>
                  )
                </>
              }
              value={this.state.dead}
              valueStyle={{ color: '#8590A6' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={
                <>
                  治愈(
                  <span style={{ color: '#5868D1' }}>
                    <Icon type='arrow-up'/>{this.state.add_cured}
                  </span>
                  )
                </>
              }
              value={this.state.cured}
              valueStyle={{ color: '#5868D1' }}
            />
          </Card>
        </Col>
      </Row>
      <Card>
        <ReactEcharts
          option={this.getOption()}
          notMerge
          lazyUpdate
          style={{ height: 700 }}
        />
      </Card>
      <Detail/>
      <History/>
    </PageHeaderWrapper>;
  }
}

export default Epidemic;
