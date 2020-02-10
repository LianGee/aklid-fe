import React, { Component } from 'react';
import { Button, Form, Input, message, Radio } from 'antd';
import { register } from '@/services/user';

interface RegisterFormProps {
  form: any;
}

class RegisterFormContent extends Component<RegisterFormProps> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        register(values).then(response => {
          if (response.status === 0) {
            message.success('注册成功');
            window.location.href = '/user/login';
          }
        });
      }
    });
  };

  passwordValidator = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return <Form {...formItemLayout} onSubmit={this.handleSubmit}>
      <Form.Item label="用户名">
        {
          getFieldDecorator('name', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input/>)
        }
      </Form.Item>
      <Form.Item label="中文名">
        {
          getFieldDecorator('chinese_name', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input/>)
        }
      </Form.Item>
      <Form.Item label="邮箱">
        {
          getFieldDecorator('email', {
            rules: [
              {
                required: true,
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
            ],
          })(<Input/>)
        }
      </Form.Item>
      <Form.Item label="手机">
        {
          getFieldDecorator('phone', {
            rules: [
              {
                required: true,
              },
              {
                pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                message: '请输入正确的手机号',
              },
            ],
          })(<Input/>)
        }
      </Form.Item>
      <Form.Item label="身份证号码">
        {
          getFieldDecorator('id_num', {
            rules: [
              {
                required: true,
                len: 18,
              },
            ],
          })(<Input/>)
        }
      </Form.Item>
      <Form.Item label="密码" hasFeedback>
        {
          getFieldDecorator('password', {
            rules: [
              {
                required: true,
                min: 8,
              },
            ],
          })(<Input.Password/>)
        }
      </Form.Item>
      <Form.Item label="确认密码" hasFeedback>
        {
          getFieldDecorator('confirm_password', {
            rules: [
              {
                required: true,
              },
              {
                validator: this.passwordValidator,
              },
            ],
          })(<Input.Password/>)
        }
      </Form.Item>
      <Form.Item label="当前所在地" extra="省/市/县">
        {
          getFieldDecorator('location', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input/>)
        }
      </Form.Item>
      <Form.Item label="上海居住地址" extra="区/具体地址">
        {
          getFieldDecorator('sh_location', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input/>)
        }
      </Form.Item>
      <Form.Item label="是否所内员工">
        {
          getFieldDecorator('is_inner_staff', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>)
        }
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" style={{ width: '100%', maxWidth: '450px' }}>
          注册
        </Button>
      </Form.Item>
    </Form>;
  }
}

const RegisterForm = Form.create()(RegisterFormContent);
export default RegisterForm;
