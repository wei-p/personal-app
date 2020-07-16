import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import InputItem from '../../components/InputItem'
import SubmitButton from '../../components/SubmitButton'
import styles from './index.module.less'
import { Form, Popover, Progress, Row, Col, Select } from 'antd'

const { Option } = Select

const passwordStatusMap = {
	ok: (
		<div className={ styles.success }>
			强度：强
		</div>
	),
	pass: (
		<div className={ styles.warning }>
			强度：中
		</div>
	),
	poor: (
		<div className={ styles.error }>
			强度：弱
		</div>
	)
}
const passwordProgressMap = {
	ok: 'success',
	pass: 'normal',
	poor: 'exception'
}

const Register = () => {
	const [visible, setVisible] = useState(false)
	const [popover, setPopover] = useState(false)
	const [prefix, setPrefix] = useState('86')
	const [form] = Form.useForm()

	const handleFinish = (values) => {
		console.log(values)
	}

	const getPasswordStatus = () => {
		const value = form.getFieldValue('password')
		if (value && value.length > 9) {
			return 'ok'
		}
		if (value && value.length > 5) {
			return 'pass'
		}
		return 'poor'
	}

	const checkPassword = (_, value) => {
		const promise = Promise
		if (!value) {
			setVisible(!!value)
			return promise.reject('请输入密码')
		}
		if (!visible) {
			setVisible(!!value)
		}
		setPopover(!popover)
		if (value && form.getFieldValue('confirm')) {
			form.validateFields(['confirm'])
		}
		return promise.resolve()
	}

	const checkConfirm = (_, value) => {
		const promise = Promise 
		if (value && value !== form.getFieldValue('password')) {
			return promise.reject('两次输入的密码不匹配')
		}
		return promise.resolve()
	}

	const renderPasswordProgress = () => {
		const value = form.getFieldValue('password')
		const passwordStatus = getPasswordStatus()
		return value && value.length && (
			<div className={ styles[`progress-${passwordStatus}`] }>
				<Progress
					status={ passwordProgressMap[passwordStatus] }
					strokeWidth={ 6 }
					percent={ value.length * 10 > 100 ? 100 : value.length * 10 }
					showInfo={ false }
					className={ styles.progress }
				></Progress>
			</div>
		)
	}

	return (
		<div className={ styles.registerContainer }>
			<div className={ styles.register }>
				<Form
						form={ form }
						onFinish={ handleFinish }
					>
					<InputItem 
						name='mail'
						placeholder='邮箱'
						size='large'
						rules={[
							{
								required: true,
								message: '请输入邮箱！'
							},
							{
								type: 'email',
								message: '请输入正确的邮箱格式！'
							}
						]}
					></InputItem>
					<Popover
						content={ 
							visible && (
								<div>
									{ passwordStatusMap[getPasswordStatus()] }
									{ renderPasswordProgress() }
									<div>
										请至少输入6位字符，请使用不容易猜到的密码。
									</div>
								</div>
							)
						}
						overlayStyle={{ width: 240 }}
						placement='right'
						visible={ visible }
					>
						<InputItem 
							name='password'
							placeholder='至少6位密码'
							size='large'
							type='password'
							rules={[
								{
									validator: checkPassword
								}
							]}
						></InputItem>
					</Popover>
					<InputItem 
						name='confirm'
						placeholder='确认密码'
						size='large'
						type='password'
						rules={[
							{
								required: true,
								message: '请输入密码！'
							}, 
							{
								validator: checkConfirm
							}
						]}
					></InputItem>
					<Row>
						<Col span={ 6 }>
							<Select
								size='large'
								value={ prefix }
								onChange={ (value) => setPrefix(value) }
								style={{ width: '100%' }}
							>
								<Option value='86'>+86</Option>
								<Option value='1'>+1</Option>
							</Select>
						</Col>
						<Col span={ 18 }>
							<InputItem
								name='mobile'
								placeholder='手机号'
								size='large'
								rules={[
									{
										required: true,
										message: '请输入手机号！'
									},
									{
										pattern: /^\d{11}$/,
										message: '手机号错误！'
									}
								]}
							></InputItem>
						</Col>
					</Row>
					<InputItem
						name='code'
						size='large'
						rules={[
							{
								required: true,
								message: '请输入验证码！'
							}
						]}
						placeholder='验证码'
					></InputItem>
					<Row justify='space-between' align='middle'>
						<Col span={8}>
							<SubmitButton>注册</SubmitButton>
						</Col>
						<Col span={16}>
							<Link className={ styles.login } to='/login'>使用已有账户登录</Link>
						</Col>
					</Row>
					
				</Form>
			</div>
		</div>
	)
}

export default Register