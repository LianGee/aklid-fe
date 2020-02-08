import React, { Component } from 'react';
import { Card, Table } from 'antd';
import { chinaDetail, overseas } from '@/services/summary';

interface DetailProps {

}

interface DetailState {
  data: [],
  overseas: [],
}

class Detail extends Component<DetailProps, DetailState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      overseas: [],
    };
  }

  componentDidMount(): void {
    chinaDetail().then(response => {
      this.setState({
        data: response.data,
      });
    });
    overseas().then(response => {
      this.setState({
        overseas: response.data,
      })
    })
  }

  render() {
    const columns = [
      { title: '省份', dataIndex: 'province_name', key: 'province_name' },
      { title: '确诊', dataIndex: 'confirmed', key: 'confirmed' },
      { title: '死亡', dataIndex: 'dead', key: 'dead' },
      { title: '疑似', dataIndex: 'suspected', key: 'suspected' },
      { title: '治愈', dataIndex: 'cured', key: 'cured' },
    ];
    const cityColumns = [
      { title: '城市', dataIndex: 'city_name', key: 'city_name' },
      { title: '确诊', dataIndex: 'confirmed', key: 'confirmed' },
      { title: '死亡', dataIndex: 'dead', key: 'dead' },
      { title: '疑似', dataIndex: 'suspected', key: 'suspected' },
      { title: '治愈', dataIndex: 'cured', key: 'cured' },
    ];
    const overseasColumns = [
      { title: '地区', dataIndex: 'name', key: 'name' },
      { title: '确诊', dataIndex: 'confirmed', key: 'confirmed' },
      { title: '死亡', dataIndex: 'dead', key: 'dead' },
      { title: '疑似', dataIndex: 'suspected', key: 'suspected' },
      { title: '治愈', dataIndex: 'cured', key: 'cured' },

    ];
    return <>
      <Card title='全国各省详细数据'>
        <Table
          columns={columns}
          expandedRowRender={(record: any) => <>
            <Table
              columns={cityColumns}
              rowKey="id"
              dataSource={record.cities}
              showHeader={false}
            />
          </>
          }
          dataSource={this.state.data}
          rowKey="id"
        />
      </Card>
      <Card title="海外疫情">
        <Table
          columns={overseasColumns}
          dataSource={this.state.overseas}
          rowKey="id"
        />
      </Card>
    </>;
  }
}

export default Detail;
