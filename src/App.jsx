import { useEffect, useState } from 'react'
import './App.css'
import allCountries from './dataFetch/countryApi'

function App() {
  useEffect(()=>{
    const fetchData=async()=>{
      const countries=await allCountries()
      console.log(countries)
    }
    fetchData()
  },[])

  return (
    <>
      <h1>COUNTRY API</h1>
    </>
  )
}

export default App
