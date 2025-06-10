import { useEffect, useState } from 'react'
import electronLogo from './assets/electron.svg'

function App() {
  const [data, setData] = useState({
    fammilywork:[],
    product:[],
    familyfio:[],
    expenceproduct:[],
  })
  useEffect(()=>{
    const fetchdata = async () => {
      const result = await window.api.getalldata();
      console.log(result)
      setData(result)
    }
    fetchdata()
  }, [])


  return (
    <div>
      
    </div>
  )
}

export default App

