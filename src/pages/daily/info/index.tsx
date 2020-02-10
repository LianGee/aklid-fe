import React, { Component } from 'react';
import HealthForm from '@/pages/daily/info/HealthForm';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';

class DailyInfo extends Component {
  render() {
    return <PageHeaderWrapper title={false}>
      <Card>
        <HealthForm/>
      </Card>
    </PageHeaderWrapper>;
  }
}

export default DailyInfo;
