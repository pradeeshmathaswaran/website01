import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import DisplayProduct from './pages/displayproduct'
import AddProduct from './pages/addproduct'
import UpdateProduct from './pages/updateproduct'

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<DisplayProduct/>}></Route>
        <Route path='/addProduct' element={<AddProduct/>}></Route>
        <Route path='/updateProduct/:id' element={<UpdateProduct/>}></Route>
      </Routes>
     </Router>
    </>
  )
}

export default App
