
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import Details from './pages/Details'
import { useState } from 'react'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
function App() {
 
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
     <div className='w-screen h-screen justify-center items-center flex-wrap overflow-x-hidden'>
      <Navbar onSearch={setSearchQuery}/>
     <div className='lg:px-32 md:px-5 px-5 flex py-5'>
      <Routes>
        <Route path='/' element={<Main searchQuery={searchQuery}/>}/>
         <Route path="/experience/:id" element={<Details/>} />
        <Route path="/experience/:id/checkout" element={<Checkout />} />
         <Route path="/confirmation/:id" element={<Confirmation />} />
            
      </Routes>
       
     </div>
     </div>
    </>
  )
}

export default App
