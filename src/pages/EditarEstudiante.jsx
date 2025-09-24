import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import SendIcon from "@mui/icons-material/Send"
import {
  getEstudianteById,
  updateEstudiante,
} from "../services/EstudiantesServices"

const EditarEstudiante = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    cursos: [],
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getEstudianteById(id)
      .then((res) => {
        setForm({
          nombre: res.nombre || "",
          apellido: res.apellido || "",
          email: res.email || "",
          cursos: res.cursos || [],
        })
        setLoading(false)
      })
      .catch((err) => {
        setError("No se pudo cargar el estudiante")
        setLoading(false)
      })
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCursosChange = (materia, checked) => {
    if (checked) {
      setForm({ ...form, cursos: [...form.cursos, materia] })
    } else {
      setForm({ ...form, cursos: form.cursos.filter((c) => c !== materia) })
    }
  }

  const validate = () => {
    let temp = {}
    temp.nombre = form.nombre ? "" : "El nombre es requerido"
    temp.apellido = form.apellido ? "" : "El apellido es requerido"
    temp.email = form.email ? "" : "El email es requerido"
    temp.cursos =
      form.cursos && form.cursos.length > 0 ? "" : "Los cursos son requeridos"
    setErrors(temp)
    return Object.values(temp).every((x) => x === "")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      updateEstudiante(id, form)
        .then(() => {
          navigate("/estudiantes")
        })
        .catch(() => {
          setError("No se pudo actualizar el estudiante")
        })
    }
  }

  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }}
      autoComplete="off"
      onSubmit={handleSubmit}>
      <h1>Editar Estudiante</h1>
      <Stack direction="column" sx={{ alignItems: "center" }} spacing={2}>
        <TextField
          name="nombre"
          label="Nombre"
          value={form.nombre}
          onChange={handleChange}
          helperText={errors.nombre || "Ingrese el nombre del estudiante"}
          error={Boolean(errors.nombre)}
        />
        <TextField
          name="apellido"
          label="Apellido"
          value={form.apellido}
          onChange={handleChange}
          helperText={errors.apellido || "Ingrese el apellido del estudiante"}
          error={Boolean(errors.apellido)}
        />
        <TextField
          name="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          helperText={errors.email || "Ingrese el email del estudiante"}
          error={Boolean(errors.email)}
        />
        <div style={{ margin: "8px 0" }}>
          <label
            style={{ fontWeight: "bold", display: "block", marginBottom: 4 }}>
            Cursos *
          </label>
          {["Matemática", "Historia", "Ciencias", "Arte"].map((materia) => (
            <label key={materia} style={{ marginRight: 16 }}>
              <input
                type="checkbox"
                name="cursos"
                value={materia}
                checked={form.cursos.includes(materia)}
                onChange={(e) => handleCursosChange(materia, e.target.checked)}
              />
              {materia}
            </label>
          ))}
          <div
            style={{
              color: errors.cursos ? "#d32f2f" : "#888",
              fontSize: 12,
              marginTop: 2,
            }}>
            {errors.cursos || "Seleccione al menos un curso"}
          </div>
        </div>
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Guardar Cambios
        </Button>
      </Stack>
    </Box>
  )
}

export default EditarEstudiante
