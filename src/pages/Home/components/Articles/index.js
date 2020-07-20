import React from 'react'
import { List, Tag } from 'antd'
import styles from './index.module.less'
import { StarTwoTone, LikeOutlined, MessageFilled } from '@ant-design/icons'
import ArticleListContent from '../ArticleListContent'

const IconText = ({ icon, text }) => (
  <span>
    {icon} {text}
  </span>
)

const Acticles = ({ list }) => {
  return (
    <div>
      <List
        size='large'
        className={styles.articleList}
        rowKey='id'
        itemLayout='vertical'
        dataSource={list}
        renderItem={(item) => { return (
          <List.Item
            key={item.id}
            actions={[
              <IconText key='star' icon={<StarTwoTone></StarTwoTone>} text={item.star}></IconText>,
              <IconText key='like' icon={<LikeOutlined></LikeOutlined>} text={item.like}></IconText>,
              <IconText key='message' icon={<MessageFilled></MessageFilled>} text={item.message}></IconText>
            ]}
          >
            <List.Item.Meta
              title={
                <a className={styles.listItemMetaTitle} href={item.href}>
                  {item.title}
                </a>
              }
              description={
                <span>
                  <Tag>Ant Design</Tag>
                  <Tag>设计语言</Tag>
                  <Tag>蚂蚁</Tag>
                </span>
              }
              >
            </List.Item.Meta>
            <ArticleListContent data={item}></ArticleListContent>
          </List.Item>
        ) }}
      ></List>
    </div>
  )
}

export default Acticles