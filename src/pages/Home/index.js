import React, { useState } from 'react'
import { Row, Col, Card, Divider, Avatar } from 'antd'
import { ContactsOutlined, ClusterOutlined, HomeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './index.module.less'

import Articles from './components/Articles'
import Applications from './components/Applications'
import Projects from './components/Projects'
import TagList from './components/TagList'
import { currentUser, fakeList } from './data'

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        文章 <span>(8)</span>
      </span>
      )
  },
  {
    key: 'applications',
    tab: (
      <span>
        应用 <span>(5)</span>
      </span>
      )
  },
  {
    key: 'projects',
    tab: (
      <span>
        项目 <span>(1)</span>
      </span>
      )
  }
]

const renderChildrenByTabKey = (tabKey) => {
  switch (tabKey) {
    case 'articles':
      return <Articles></Articles>
    case 'applications':
      return <Applications></Applications>
    case 'projects':
      return <Projects></Projects>
    default:
      return <Articles></Articles>
  }
}

const renderUserInfo = (currentUser) => {
  return (
    <div className={styles.detail}>
      <p>
        <ContactsOutlined className={styles.userInfoIcon}></ContactsOutlined>
        {currentUser.title}
      </p>
      <p>
        <ClusterOutlined className={styles.userInfoIcon}></ClusterOutlined>
        {currentUser.group}
      </p>
      <p>
        <HomeOutlined className={styles.userInfoIcon}></HomeOutlined>
        {(currentUser.geographic || { province: {label: ''}}).province.label}
        {(currentUser.geographic || { city: {label: ''}}).city.label}
      </p>
    </div>
  )
}

const Home = () => {
  const [tabKey, setTabKey] = useState('articles')
  const onTabChange = (key) => {
    setTabKey(key)
  }
  
  return (
    <div className={styles.container}>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <div className={styles.avatarHolder}>
              <img alt='' src={currentUser.avatar}></img>
              <div className={styles.name}>{currentUser.name}</div>
              <div>{currentUser.signature}</div>
            </div>
            {renderUserInfo(currentUser)}
            <Divider dashed></Divider>
            <TagList tags={currentUser.tags}></TagList>
            <div className={styles.team}>
              <div className={styles.teamTitle}>团队</div>
              <Row gutter={36}>
                {
                  currentUser.notice && 
                  currentUser.notice.map((item) => {
                    return (
                      <Col key={item.id} lg={24} xl={12}>
                        <Link to='/setting'>
                          <Avatar size='small' src={item.logo}></Avatar>
                          {item.member}
                        </Link>
                      </Col>
                    )
                  })
                }
              </Row>
            </div>
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card 
            bordered={false}
            tabList={operationTabList}
            activeTabKey = {tabKey}
            onTabChange = {onTabChange}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Home