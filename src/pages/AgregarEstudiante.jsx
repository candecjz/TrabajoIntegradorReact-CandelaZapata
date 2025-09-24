import SendIcon from "@mui/icons-material/Send"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { createEstudiante } from "../services/EstudiantesServices"

const AgregarEstudiante = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    cursos: [],
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    let temp = {}
    temp.nombre = form.nombre ? "" : "El nombre es requerido"
    temp.apellido = form.apellido ? "" : "El apellido es requerido"
    temp.email = form.email ? "" : "El email es requerido"
    temp.cursos = form.cursos ? "" : "Los cursos son requeridos"
    setErrors(temp)
    return Object.values(temp).every((x) => x === "")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      console.log("Datos del estudiante:", form)
      createEstudiante(form)
      setForm({ nombre: "", apellido: "", email: "", cursos: [] })
      setErrors({})
    }
  }

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }}
      autoComplete="off"
      onSubmit={handleSubmit}>
      <h1>Agregar Nuevo Estudiante</h1>
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
                onChange={(e) => {
                  if (e.target.checked) {
                    setForm({ ...form, cursos: [...form.cursos, materia] })
                  } else {
                    setForm({
                      ...form,
                      cursos: form.cursos.filter((c) => c !== materia),
                    })
                  }
                }}
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
          Agregar Estudiante
        </Button>
      </Stack>
    </Box>
  )
}

export default AgregarEstudiante
