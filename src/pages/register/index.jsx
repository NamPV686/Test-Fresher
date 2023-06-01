import { useState } from 'react';
import { Button, Divider, Form, Input, message, notification } from 'antd';
import './register.scss';
import { postRegister } from '../../service/apiService';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [ isSubmit, setIsSubmit ] = useState(false);

    const openNotification = () => {
        
      };

    const onFinish = async(values) => {
        const { fullName, email, password, phone } = values;

        setIsSubmit(true);
        let res = await postRegister(fullName, email, password, phone);
        setIsSubmit(false);

        if(res?.data?._id){
            message.info('Đăng ký tài khoản thành công!');
            navigate('/login');
        } else{
            notification.error({
                message: `Có lỗi xảy ra`,
                description: res?.message,
                duration: 5
            });
        }
    };
    

    return(
        <div className='register-page'>
            <div className='register-content' style={{padding: '50px'}}>
                <h1 style={{textAlign: 'center'}}>Đăng Ký Tài Khoản</h1>
                <Divider />
                <Form
                    name="basic"
                    // style={{ maxWidth: 600, margin: '0 auto' }}
                    onFinish={onFinish}
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
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <span>Bạn đã có tài khoản? 
                            <Link to="/login"> Login</Link>
                        </span>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default RegisterPage;