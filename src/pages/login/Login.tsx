import { Button, Form, Input, message } from 'antd'
import type { LoginForm } from '../../types/login.type'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywidXNlcm5hbWUiOiJ0ZXN0In0.XYZ123FAKE456TOKEN789';
    const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicmVmcmVzaCIsInVzZXJJZCI6MTIzfQ.fake_signature_abc123';

    const onFinish = (values: LoginForm) => {
        if (values.username === 'Gulzar' && values.password === 'Gulzar') {
            message.success('Login successfully');

            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)

            navigate(0)
        } else {
            message.error('Login failed');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center from-slate-100 to-slate-200 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Please login to your account
                    </p>
                </div>

                <Form
                    name="login"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    className="space-y-2"
                >
                    <Form.Item<LoginForm>
                        label={<span className="text-gray-700 font-medium">Username</span>}
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your username!' }
                        ]}
                    >
                        <Input
                            placeholder="Enter your username"
                            size="large"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item<LoginForm>
                        label={<span className="text-gray-700 font-medium">Password</span>}
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' }
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter your password"
                            size="large"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item className="mb-0">
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                        >
                            Sign In
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}