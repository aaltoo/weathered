import React, { useEffect } from 'react'
import './App.css'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { fetchWeatherByCoords, initializeMode } from './features/app-slice'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { Header } from './components/Header'
import { Search } from './pages/Search'
import { Sidebar } from './components/Sidebar'

const App = () => {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.app.mode)

  useEffect(() => {
    dispatch(initializeMode())
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          fetchWeatherByCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        )
      })
    } else {
      /* geolocation IS NOT available */
    }
  }, [dispatch])

  return (
    <div className="App">
      <ThemeProvider theme={{ mode }}>
        <Header />
        <Sidebar />
        <Router>
          <Routes>
            <Route path="/" element={<Search />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
