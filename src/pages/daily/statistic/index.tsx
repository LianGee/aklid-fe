import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, Row, Table } from 'antd';
import { infoStatistic } from '@/services/DailyInfo';
import moment from 'moment';

interface DailyStatisticProps {

}

interface DailyStatisticState {
  data: [];
  infoStart: string;
  infoEnd: string;
}


class DailyStatistic extends Component<DailyStatisticProps, DailyStatisticState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      infoStart: moment().locale('zh-cn').format('YYYYMMDD'),
      infoEnd: moment().locale('zh-cn').format('YYYYMMDD'),
    };
  }

  componentDidMount(): void {
    this.queryData();
  }

  queryData = () => {
    const { infoStart, infoEnd } = this.state;
    infoStatistic(infoStart, infoEnd).then(response => {
      if (response.status === 0) {
        this.setState({
          data: response.data,
        });
      }
    });
  };

  exportData = () => {
    const { infoStart, infoEnd } = this.state;
    window.open(`/apis/daily/info/download?start=${infoStart}&end=${infoEnd}`);
  };

  render() {
    const columns = [
      { title: '姓名', dataIndex: 'chinese_name', keyIndex: 'chinese_name' },
      { title: '是否在沪', dataIndex: 'in_sh', keyIndex: 'in_sh' },
      { title: '所在地', dataIndex: 'location', keyIndex: 'location' },
      { title: '身体状况', dataIndex: 'health', keyIndex: 'health' },
      { title: '症状', dataIndex: 'symptom', keyIndex: 'symptom' },
      { title: '接触史', dataIndex: 'contact_history', keyIndex: 'contact_history' },
      { title: '近期外出公共场所', dataIndex: 'access_public', keyIndex: 'access_public' },
      { title: '返沪日期', dataIndex: 'return_date', keyIndex: 'return_date' },
      { title: '备注', dataIndex: 'note', keyIndex: 'note' },
    ];
    return <PageHeaderWrapper title={false}>
      <Card title="健康状况汇总">
        <Row style={{marginBottom: 20}}>
          <Button type="primary" style={{float: 'right'}} onClick={this.exportData}>导出</Button>
        </Row>
        <Table
          columns={columns}
          dataSource={this.state.data}
          rowKey="id"
        />
      </Card>
    </PageHeaderWrapper>;
  }
}

export default DailyStatistic;
