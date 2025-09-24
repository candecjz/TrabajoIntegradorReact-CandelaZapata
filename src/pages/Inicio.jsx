import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getEstudiantes } from "../services/EstudiantesServices"
import { Box, Button, Paper, Typography } from "@mui/material"

const Inicio = () => {
  const [cantidadEstudiantes, setCantidadEstudiantes] = useState(0)

  useEffect(() => {
    const fetchEstudiantes = async () => {
      const data = await getEstudiantes()
      if (Array.isArray(data)) {
        setCantidadEstudiantes(data.length)
      }
    }
    fetchEstudiantes()
  }, [])

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bienvenido a la Gestión de Estudiantes
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Acá podes administrar estudiantes, ver la lista completa o agregar
        nuevos registros.
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">
          Total de estudiantes registrados: {cantidadEstudiantes}
        </Typography>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          component={Link}
          to="/estudiantes"
        >
          Ver Estudiantes
        </Button>

        <Button 
          variant="contained"
          component={Link}
          to="/estudiantes/nuevo"
        >
          Agregar Estudiante
        </Button>
      </Box>
    </Box>
  )
}

export default Inicio
