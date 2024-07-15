import React from 'react'
import Navbar from './section/Navbar'
import Wrapper from './section/Wrapper'
import Footer from './section/Footer'
import Background from './components/Background'
import "./scss/index.scss";

function App() {
  return (
    <div className='main-container'>
      <Background />
      <div className="app">
        <Navbar />
        <Wrapper />
        <Footer />
      </div>
    </div>
  )
}

export default App