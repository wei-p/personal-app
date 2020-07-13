import React, { useState, useEffect } from 'react'
import { Input, Form, Button, Row, Col, message } from 'antd'
import styles from './index.module.less'

const InputItem = (props) => {
	const { name, rules, ...rest } = props
	const [timing, setTiming] = useState(false) // 是否在倒计时
	const [count, setCount] = useState(props.countDown || 60) // 倒计时秒数
	const handleClickCode = () => {
		message.success('成功获取验证码1234')
		setTiming(true) // 计时打开
	}
	useEffect(() => {
		let interval = 0
		// 改变后的timing
		if (timing) {
			interval = window.setInterval(() => {
				setCount((preSecond) => {
					if (preSecond <= 1) {
						setTiming(false) // 不再计时，倒计时结束
						clearInterval(interval)
						return props.countDown || 60  // 结束
					} 
					return preSecond - 1
				})
			}, 1000)
		}
		return () => clearInterval(interval)
	}, [timing])

	if (name === 'code') {
		return (
			<Form.Item name={ name } rules={ rules }>
				<Row gutter={ 8 }>
					<Col span={ 16 }>
						<Input { ...rest }></Input>
					</Col>
					<Col span={ 8 }>
						<Button 
							className={ styles.getCode } 
							disabled={ timing }
							size='large'
							onClick={ handleClickCode }
							>
							{ timing ? count + 's' : '获取验证码' }
						</Button>
					</Col>
				</Row>
			</Form.Item>
		)
	}
	return (
		<Form.Item name={ name } rules={ rules }>
			<Input { ...rest }></Input>
		</Form.Item>
	)
}

export default InputItem