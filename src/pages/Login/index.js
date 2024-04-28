import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchToken } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log(values)
    dispatch(fetchToken(values))

    navigate('/')
    message.success('Login Success')
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* Login Form */}
        <Form onFinish={onFinish} validateTrigger='onBlur'>
          <Form.Item name='mobile' rules={[
            {
              required: true,
              message: 'Please input your mobile'
            },
            {
              pattern: /^1[3-9]\d{9}$/,
              message: 'Please input right phone number'
            }
          ]}>
            <Input size="large" placeholder="Please input your mobile" />
          </Form.Item>
          <Form.Item name='code' rules={[
            {
              required: true,
              message: 'Please input your code'
            }
          ]}>
            <Input size="large" placeholder="Please input your code" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login