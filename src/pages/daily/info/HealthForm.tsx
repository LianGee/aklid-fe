import React, { Component } from 'react';
import { Button, Checkbox, DatePicker, Form, message, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { infoSave } from '@/services/DailyInfo';

interface HealthFormProps {
  form: any;
}

class HealthFormContent extends Component<HealthFormProps> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, fieldsValue: any) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          return_date: fieldsValue.return_date ? fieldsValue.return_date.format('YYYY-MM-DD') : '',
        };
        infoSave(values).then(response => {
          if (response.status !== 0) {
            message.error(response.msg);
          }else {
            message.success('提交成功');
          }
        })
      }
    });
  };

  symptomValidator = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (form.getFieldValue('health') === 0 && (value === undefined || value.length === 0)) {
      callback('健康异常时，症状必填');
    }
    callback();
  };

  returnDateValidator = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (form.getFieldValue('in_sh') === 0 && value === undefined) {
      callback('不在上海时，必填');
    }
    callback();
  };

  noteValidator = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if ((form.getFieldValue('contact_history') === 1
      || form.getFieldValue('access_public') === 1) &&
      (value === undefined || value.length === 0)
    ) {
      callback('有接触史/进出公共场所时请备注');
    }
    callback();
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
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
          offset: 6,
        },
      },
    };
    return <Form {...formItemLayout} onSubmit={this.handleSubmit}>
      <Form.Item label="是否在沪">
        {
          getFieldDecorator('in_sh', {
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
      <Form.Item label="身体状况">
        {
          getFieldDecorator('health', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Radio.Group>
            <Radio value={1}>健康</Radio>
            <Radio value={0}>异常</Radio>
          </Radio.Group>)
        }
      </Form.Item>
      <Form.Item label="症状">
        {
          getFieldDecorator('symptom', {
            rules: [
              {
                validator: this.symptomValidator,
              },
            ],
          })(<Checkbox.Group
            options={[
              {
                label: '发热',
                value: 0,
              },
              {
                label: '咳嗽',
                value: 1,
              },
              {
                label: '炎症',
                value: 2,
              },
              {
                label: '其他',
                value: 3,
              },
              {
                label: '疑似感染',
                value: 4,
              },
            ]}
          />)
        }
      </Form.Item>
      <Form.Item label="接触史" extra="家中亲属/本人有无接触过重症疫区人员，如有请备注">
        {
          getFieldDecorator('contact_history', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Radio.Group>
            <Radio value={1}>有</Radio>
            <Radio value={0}>无</Radio>
          </Radio.Group>)
        }
      </Form.Item>
      <Form.Item label="进出公共场所" extra="近期有无出入公共场所，如有请备注">
        {
          getFieldDecorator('access_public', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Radio.Group>
            <Radio value={1}>有</Radio>
            <Radio value={0}>没有</Radio>
          </Radio.Group>)
        }
      </Form.Item>
      <Form.Item label="预计返沪日期">
        {
          getFieldDecorator('return_date', {
            rules: [
              {
                validator: this.returnDateValidator,
              },
            ],
          })(<DatePicker/>)
        }
      </Form.Item>
      <Form.Item label="备注" extra="其他情况，请备注">
        {
          getFieldDecorator('note', {
            rules: [
              {
                validator: this.noteValidator,
              },
            ],
          })(<TextArea/>)
        }
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>;
  }
}

const HealthForm = Form.create()(HealthFormContent);
export default HealthForm;
