import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Hello from './components/Hello/Hello'
import Proffessional from './components/proffessional/proffessional'
import WhatDoIdo from './components/WhatDoIdo/WhatDoIdo'
import Portfolio from './components/Portfolio/Portfolio'
import CreateMe from './components/ContactMe/CreateMe'
import Services from './components/Services/Services'

function PortfolioHome() {
  return (
    <>
      <Header />
      <Hello />
      <Proffessional />
      <WhatDoIdo />
      <CreateMe />
      <Portfolio />
      <Services />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/*" element={<PortfolioHome />} />
    </Routes>
  )
}

export default App
