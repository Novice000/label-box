import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Annotation from "./Annotation";
import Projects from "./Project";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={ <Projects /> } />
          <Route path="annotation" element = { <Annotation/> } />
        </Routes>
      </BrowserRouter>
  )

}

export default App;
