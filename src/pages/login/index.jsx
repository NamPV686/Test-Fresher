import { Button, Checkbox, Divider, Form, Input, message, notification } from 'antd';
import './login.scss';
import { useNavigate, Link } from 'react-router-dom';
import { postLogin } from '../../service/apiService';
import { useState } from 'react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [ isSubmit, setIsSubmit ] = useState(false);

    const onFinish = async (values) => {
        const { username, password } = values;

        setIsSubmit(true);
        let res = await postLogin(username, password);
        setIsSubmit(false);

        if(res?.data){
            localStorage.setItem('access_token', res.data.access_token)
            message.info('Đăng nhập thành công!');
            navigate('/');
        } else{
            notification.error({
                message: `Có lỗi xảy ra`,
                description: res?.message,
                duration: 5
            });
        }
      };

    return(
        <div className='login-page'>
            <div className='login-content'>
                <h1 style={{textAlign: 'center'}}>Đăng Nhập</h1>
                <Divider />
                <Form
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                    labelCol={{ span: 24 }}
                    label="Email"
                    name="username"
                    rules={[{ required: true, message: 'Please input your email!' }]}
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

                    <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                    <Form.Item>
                        <span>Bạn chưa có tài khoản? 
                            <Link to="/register"> Singup</Link>
                        </span>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage;