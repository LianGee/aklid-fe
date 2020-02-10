import React, { Component } from 'react';
import { Card } from 'antd';
import RegisterForm from './components/RegisterForm';

class Register extends Component {
  form: any;

  saveRef = (ref: any) => {
    this.form = ref;
  };

  render() {
    return <Card>
      <RegisterForm ref={this.saveRef}/>
    </Card>;
  }
}

export default Register;
