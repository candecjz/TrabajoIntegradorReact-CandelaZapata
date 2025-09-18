import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './layout/dashboard'
import Inicio from './pages/Inicio'

function App() {

  return (
    <>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/estudiantes" element={<h1>Hola viejo meao</h1>} />
          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
