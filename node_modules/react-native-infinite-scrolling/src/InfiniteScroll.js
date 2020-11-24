import React from 'react'
import { FlatList } from 'react-native'

const InfiniteScroll = (props) => {
  const { renderData, data, loadMore } = props
  return (
    <FlatList
      data = { data }
      renderItem = { renderData }
      keyExtractor = {(item, index) => index.toString()}
      onEndReached = { loadMore }
    />
  )
}

export default InfiniteScroll
