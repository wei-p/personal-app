import React from 'react'
import { List, Card, Tooltip, Dropdown, Menu, Avatar } from 'antd'
import { DownloadOutlined, ShareAltOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons'
import numeral from 'numeral'
import styles from './index.module.less'

const itemMenu = (
  <Menu>
    <Menu.Item>
      <a target='_blank' rel='noopener noreferrer' href='https://www.alipay.com'>
        menu item-1
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target='_blank' rel='noopener noreferrer' href='https://www.alipay.com'>
        menu item-2
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target='_blank' rel='noopener noreferrer' href='https://www.alipay.com'>
        menu item-3
      </a>
    </Menu.Item>
  </Menu>
)

const CardInfo = ({ activeUser, newUser }) => (
  <div className={styles.cardInfo}>
    <div>
      <p>活跃用户</p>
      <p>{activeUser}</p>
    </div>
    <div>
      <p>新增用户</p>
      <p>{newUser}</p>
    </div>
  </div>
)

function formatWan(val) {
  const v = val * 1
  if (!v || Number.isNaN(v)) {
    return ''
  }
  let result = val 
  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span>
          万
        </span>
      </span>
    )
  }
  return result
}

const Applications = ({ list }) => {
  return (
    <List
      className={styles.filterCardList}
      rowKey='id'
      grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1}}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          key={item.id}
        >
          <Card
            hoverable
            bodyStyle={{ paddingBottom: 20 }}
            actions={[
              <Tooltip key='download' title='下载'>
                <DownloadOutlined></DownloadOutlined>
              </Tooltip>,
              <Tooltip key='edit' title='编辑'>
                <EditOutlined></EditOutlined>
              </Tooltip>,
              <Tooltip key='share' title='分享'>
                <ShareAltOutlined></ShareAltOutlined>
              </Tooltip>,
              <Dropdown overlay={itemMenu} key='ellipsis'>
                <EllipsisOutlined></EllipsisOutlined>
              </Dropdown>
            ]}
          >
            <Card.Meta
              avatar={<Avatar size='small' src={item.avatar}></Avatar>}
              title={item.title}
            ></Card.Meta>
            <div>
              <CardInfo
                activeUser={formatWan(item.activeUser)}
                newUser={numeral(item.newUser).format('0,0')}
              ></CardInfo>
            </div>
          </Card>
        </List.Item>
      )}
    >
    </List>
  )
}

export default Applications