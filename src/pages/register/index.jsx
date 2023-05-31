import React from 'react';
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import './register.scss'

const onFinish = (values) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

const RegisterPage = () => {
    return(
        <div className='register-page' style={{padding: '50px'}}>
            <h3 style={{textAlign: 'center'}}>Đăng Ký Tài Khoản</h3>
            <Divider />
            <Form
                name="basic"
                // style={{ maxWidth: 600, margin: '0 auto' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                labelCol={{ span: 24 }}
                label="FullName"
                name="fullName"
                rules={[{ required: true, message: 'Please input your fullname!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                labelCol={{ span: 24 }}
                label="Email"
                name="email"
                rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                labelCol={{ span: 24 }}
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item
                labelCol={{ span: 24 }}
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={false}>
                    Submit
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RegisterPage;