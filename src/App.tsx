import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import SelectorBar from './components/SelectorBar';
import axios from 'axios'
import moment from 'moment'
import lodash from 'lodash'

function App() {
  const [data, setData] = useState("")
  const [count, setCount] = useState(0)
  const [format] = useState<"raw" | "json">("raw")
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
        setData("No domains found. Try a different date.")
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
        <div className="absolute top-2 right-6 flex flex-end justify-between items-center">
          { url && count ? (
            <a href={url} target={`_blank`} className="text-black bg-blue-300 hover:bg-blue-400 p-3 rounded-lg text-sm mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          ) : null }
          { count ? <div className="text-black bg-slate-300 p-3 rounded-lg text-sm">{numberWithCommas(count)} domains</div> : null }
        </div>
      </div>
    </>
  );
}

export default App;
