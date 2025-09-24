import toaster from "react-hot-toast"

const API_URL = "http://localhost:3000/estudiantes"

export const getEstudiantes = async () => {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error al obtener los estudiantes:", error)
    toaster.error("Error al obtener los estudiantes")
  }
}

export const getEstudianteById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error al obtener el estudiante:", error)
    toaster.error("Error al obtener el estudiante")
  }
}

export const createEstudiante = async (estudiante) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(estudiante),
    })
    const data = await response.json()
    if (response.ok) {
      toaster.success("Estudiante creado con éxito")
    }
    return data
  } catch (error) {
    console.error("Error al crear el estudiante:", error)
    toaster.error("Error al crear el estudiante")
  }
}

export const updateEstudiante = async (id, estudiante) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(estudiante),
    })
    const data = await response.json()
    if (response.ok) {
      toaster.success("Estudiante actualizado con éxito")
    }
    return data
  } catch (error) {
    console.error("Error al actualizar el estudiante:", error)
    toaster.error("Error al actualizar el estudiante")
  }
}

export const deleteEstudiante = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
    const data = await response.json()
    if (response.ok) {
      toaster.success("Estudiante eliminado con éxito")
    }
    return data
  } catch (error) {
    console.error("Error al eliminar el estudiante:", error)
    toaster.error("Error al eliminar el estudiante")
  }
}
