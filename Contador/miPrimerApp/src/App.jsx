import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Saludo from './Saludo.jsx' 
import Contador from './components/contador.jsx'



function App() {
 
 return (
    <>
      <section id="center">
        <div>
          <h1>Jorge Osornio Carrillo</h1>
        </div>
        <Saludo nombre='YORCH' tipo='dias'/>
        {/* <h2>Contador = {count} </h2> */}
        <Contador/>
      </section>

    </>
  )
}

export default App
