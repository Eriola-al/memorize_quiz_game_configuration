import "./LoginPage.css"

import React, {useState} from "react";
import {Space, Button, Input} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone,UserOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom";


const LoginPage = ({ setAuthorised }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();


    const handleClick = () => {
        if (username.startsWith('admin') && password !== '') {
            setAuthorised({admin : true});
            navigate(`/admin`)
        }else if (username.startsWith('user') && password !== '') {
            setAuthorised({game : true});
            navigate(`/game`)
        } else {
            alert('Wrong Credentials! Please enter new credentials.')
        }

    }


    return (
        <div className='form-card'>
            <h3>WELCOME BACK</h3>
            <h1 style={{color:"#1890ff"}}>Log into your account</h1>
            <Space direction="vertical" className='form-input'>
                <label>Username</label>
                <Input label="name"
                       size="large"
                       placeholder="Enter your username"
                       prefix={<UserOutlined/>}
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password</label>
                <Input.Password placeholder="Enter your password"
                                iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                />
                <Button block
                        value="large"
                        shape="rectangle"
                        type="primary"
                        htmlType="submit"
                        onClick={handleClick}>
                    Sign in
                </Button>
            </Space>
        </div>
    )
}
export default LoginPage;