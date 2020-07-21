import React from 'react'
import { List, Card } from 'antd'
import moment from 'moment'
import styles from './index.module.less'

const Projects = ({ list }) => {
  return (
    <List
      rowkey='id'
      grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card
            hoverable
            cover={<img alt={item.title} src={item.cover} ></img>}
          >
            <Card.Meta title={<a href='_blank'>{item.title}</a>} description={item.subDescription}></Card.Meta>
            <div className={styles.updateTime}>
              <span>{moment(item.updateAt).fromNow()}</span>
            </div>
          </Card>
        </List.Item>
      )}
    ></List>
  )
}

export default Projects