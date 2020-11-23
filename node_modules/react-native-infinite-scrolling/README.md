<h1>react-native-infinite-scrolling</h1>

A react native package developed to implement infinite scrolling in any react-native app.

<h1>Getting Started</h1>

**Install via npm**

```shell
npm i react-native-infinite-scrolling
```

<h1>Usage</h1>

Import the **InfiniteScroll** component from **react-native-infinite-scrolling**: 

```shell
import InfiniteScroll from 'react-native-infinite-scrolling'
```

This component accepts 3 parameters / props:

1. **data**: It contains data in form of an array which will be mapped.
2. **renderData**: It accepts a function which returns the mapped data. It accepts a single parameter which indicates a single element of the data array.
3. **loadMore**: It also accepts a function which will load more data once the bottom of the page is reached while scrolling.

<h1>Usage Example:</h1>

```shell
import InfiniteScroll from 'react-native-infinite-scrolling'

const TestingApplication = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    loadMore()
  },[])

  const renderData = ({ item }) => {
    return(
      <View>
        <Text> {item.title} </Text>
        <Text> {item.id} </Text>
      </View>
    )
  }

  const loadMore = () => {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then((response) => {
      let updatedData = data.concat(response.data)
      setData(updatedData)
    })
    .catch((error) => console.log('error =', error))
  }
  return(
    <InfiniteScroll 
      renderData = {renderData}
      data = { data }
      loadMore = { loadMore }
    />
  )
}

export default TestingApplication
```

<h1>Build with: </h1>

1. React
2. react-native
3. Hooks
