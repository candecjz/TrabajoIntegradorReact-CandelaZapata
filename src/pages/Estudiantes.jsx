import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getEstudiantes,
  deleteEstudiante,
} from "../services/EstudiantesServices"
import { DataGrid } from "@mui/x-data-grid"
import { Paper } from "@mui/material"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import Stack from "@mui/material/Stack"

const Estudiantes = () => {
  const navigate = useNavigate()
  const [estudiantes, setEstudiantes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEstudiantes()
      setEstudiantes(data)
      console.log(data)
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este estudiante?")
    ) {
      await deleteEstudiante(id)
      const data = await getEstudiantes()
      setEstudiantes(data)
    }
  }

  const columnas = [
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "apellido", headerName: "Apellido", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "cursos",
      headerName: "Cursos",
      width: 300,
      renderCell: (params) => (
        <span>
          {Array.isArray(params.row.cursos) ? params.row.cursos.join(", ") : ""}
        </span>
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 250,
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/estudiantes/editar/${params.row._id}`)}
            disabled={!params?.row?._id}>
            Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            disabled={!params?.row?._id}
            onClick={() => params?.row?._id && handleDelete(params.row._id)}>
            Borrar
          </Button>
        </Stack>
      ),
    },
  ]

  const paginationModel = { page: 0, pageSize: 5 }

  return (
    <>
      <h1>Lista de Estudiantes</h1>
      <Paper>
        <DataGrid
          rows={estudiantes}
          columns={columnas}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          pageSizeOptions={[5]}
          checkboxSelection
          localeText={{
            noRowsLabel: "No hay estudiantes disponibles",
            footerRowSelected: (count) =>
              count !== 1
                ? `${count.toLocaleString()} filas seleccionadas`
                : `${count.toLocaleString()} fila seleccionada`,
          }}
        />
      </Paper>
    </>
  )
}

export default Estudiantes
