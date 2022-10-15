import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import SelectorBar from './components/SelectorBar';
import axios from 'axios'
import moment from 'moment'
import lodash from 'lodash'

function App() {
  const [data, setData] = useState("")
  const [count, setCount] = useState(0)
  const [format, setFormat] = useState<"raw" | "json">("raw")
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState(null)

  const formatDownloadUrl = () => {
    const url = new URL(window.location.href);
    const yValue = url.searchParams.get('y')
    const mValue = url.searchParams.get('m')
    const dValue = url.searchParams.get('d')
    const bsValue = url.searchParams.get('bs')
    const formattedUrl = `https://dropfilter.app/api/droplist?service=${bsValue}&filename=${mValue}-${dValue}-${yValue}.txt`
    setUrl(formattedUrl)
  }

  const numberWithCommas = (x) => {
    return lodash(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const getData = () => {
    if (!url && !window.location.search) {
      const url = new URL(window.location.href);
      url.searchParams.set('y', moment().format("YYYY"))
      url.searchParams.set('m', moment().format("M"))
      url.searchParams.set('d', moment().format("DD"))
      url.searchParams.set('bs', 'namejet')
      window.location.href = url.toString();
      return
    }

    axios.get(url)
      .then(response => {
        const rawData = response.data
        const rawList = rawData.split(/\s+/).filter(Boolean)

        const jsonData = {
          count: rawList.length,
          domains: rawList
        }

        setCount(rawList.length)

        if (format === "raw") {
          setData(rawData)
        } else {
          setData(JSON.stringify(jsonData, null, 2))
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    formatDownloadUrl()
  }, [])

  useEffect(getData, [url, format])

  return (
    <>
      <Hero />
      <SelectorBar />
      <div className="relative flex place-content-center items-center" style={{height: `calc(100vh - 240px)`}}>
        <textarea readOnly name="output" id="output" className="w-full h-full border-none" value={data}></textarea>
        <div className="absolute top-2 right-6 text-black bg-slate-300 p-3 rounded-lg text-sm">{numberWithCommas(count)} domains</div>
      </div>
    </>
  );
}

export default App;
