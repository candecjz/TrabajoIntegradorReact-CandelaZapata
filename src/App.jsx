import { Route, Routes } from "react-router-dom"
import "./App.css"
import Dashboard from "./layout/dashboard"
import Inicio from "./pages/Inicio"
import Estudiantes from "./pages/Estudiantes"
import AgregarEstudiante from "./pages/AgregarEstudiante"
import EditarEstudiante from "./pages/EditarEstudiante"

function App() {
  return (
    <>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/estudiantes/nuevo" element={<AgregarEstudiante />} />
          <Route
            path="/estudiantes/editar/:id"
            element={<EditarEstudiante />}
          />
          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
