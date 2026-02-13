import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {data} from "./utils/data.js"
import { PageContent } from './components/PageContent.jsx'

function App() {
  const [currentPage, setcurrentPage] = useState(1)
  const itemsPerPage=6;

  const totalPages = Math.ceil(data.length/itemsPerPage)
  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex-itemsPerPage

  const currentItemList = data.slice(firstItemIndex,lastItemIndex)

  const handleNext=()=> setcurrentPage((prev)=>(Math.min(prev+1,totalPages) ))
  const handlePrev=()=> setcurrentPage((prev)=>(Math.max(prev-1,1) ))
  return (
    <>
      <PageContent
       items={currentItemList}
        onNext={handleNext}
        onPrev={handlePrev}
        isFirstPage={currentPage==1}
        isLastPage={currentPage==totalPages}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  )
}

export default App
