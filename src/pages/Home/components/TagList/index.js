import React, { useState } from 'react'
import { Tag, Input } from 'antd'
import styles from './index.module.less'
import { PlusOutlined } from '@ant-design/icons'

const TagList = ({ tags }) => {
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [newTags, setNewTags] = useState([])

  const showInput = () => {
    setInputVisible(true)
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleInputConfirm = () => {
    let tempTags = [...newTags]
    if (inputValue && 
        !tags.concat(tempTags).map(({ label }) => label).includes(inputValue)
      ) {
      tempTags = [...tempTags, { key: `new-${tempTags.length}`, label: inputValue }]
    }
    setNewTags(tempTags)
    setInputVisible(false)
    setInputValue('')
  }

  return (
    <div className={styles.tags}>
      <div className={styles.tagTitle}>标签</div>
      {(tags || []).concat(newTags).map(tag => {
        return (
          <Tag key={tag.key}>{tag.label}</Tag>
        )
      })}
      {
        inputVisible && 
        <Input
          size='small'
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        ></Input>
      } 
      {
        (!inputVisible) && 
        <Tag onClick={showInput}  style={{ borderStyle: 'dashed' }}>
          <PlusOutlined></PlusOutlined>
        </Tag>
      }
    </div>
  )
}

export default TagList

