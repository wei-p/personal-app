import React, { useState } from 'react'
import { Tabs, Form, Checkbox, Row } from 'antd'
import InputItem from '../../components/InputItem'
import SubmitButton from '../../components/SubmitButton'
import { UserOutlined, LockOutlined, MobileOutlined, 
	MailTwoTone, AlipayCircleOutlined, TaobaoCircleOutlined, 
	WeiboCircleOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { Link } from 'react-router-dom'
const { TabPane } = Tabs

const Login = () => {
	const [form] = Form.useForm()
	const [autoLogin, setAutoLogin] = useState(true)
	const handleFinish = (values) => {
		console.log(values)
	}
  return (
		<div className={ styles.loginContainer }>
			<div className={ styles.login }>
				<Form
					form={ form }
					onFinish={ handleFinish }
				>
					<Tabs defaultActiveKey='1'>
						<TabPane tab='账号密码登录' key='1'>
							<InputItem 
								name='username'
								prefix={ 
									<UserOutlined style={{ color: '#1890ff' }}></UserOutlined>
								}
								placeholder='用户名'
								size='large'
								rules={[
									{
										required: true,
										message: '请输入用户名！'
									}
								]}
							></InputItem>
							<InputItem 
								name='password'
								prefix={ 
									<LockOutlined style={{ color: '#1890ff' }}></LockOutlined>
								}
								placeholder='密码'
								size='large'
								type='password'
								rules={[
									{
										required: true,
										message: '请输入密码！'
									}
								]}
							></InputItem>
						</TabPane>
						<TabPane tab='手机号登录' key='2' >
						<InputItem 
								name='phone'
								prefix={ 
									<MobileOutlined style={{ color: '#1890ff' }}></MobileOutlined>
								}
								placeholder='手机号'
								size='large'
								rules={[
									{
										required: true,
										message: '请输入手机号！'
									}
								]}
							></InputItem>
							<InputItem 
								name='code'
								prefix={ 
									<MailTwoTone style={{ color: '#1890ff' }}></MailTwoTone>
								}
								placeholder='验证码'
								size='large'
								rules={[
									{
										required: true,
										message: '请输入验证码！'
									}
								]}
							></InputItem>
						</TabPane>
					</Tabs>
					<Row justify='space-between'>
							<Checkbox 
								checked={ autoLogin }
								onChange={ (e) => setAutoLogin(e.target.checked) }
							>自动登录</Checkbox>
							<a href='#!'>忘记密码</a>
					</Row>
					<SubmitButton>登录</SubmitButton>
				</Form>
				<div className={ styles.other }>
					其他登录方式
					<AlipayCircleOutlined className={ styles.icon }></AlipayCircleOutlined>
					<TaobaoCircleOutlined className={ styles.icon }></TaobaoCircleOutlined>
					<WeiboCircleOutlined className={ styles.icon }></WeiboCircleOutlined>
					<Link className={ styles.register } to='/register'>注册账户</Link>
				</div>
			</div>
		</div>
  )
}

export default Login