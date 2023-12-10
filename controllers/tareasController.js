import Project from '../models/Projects.js'
import Tarea from '../models/Tareas.js'

const newTarea = async (req, res) => {
    const { project } = req.body
    const projectExist = await Project.findById(project)

    if (!projectExist){
        const error = new Error('El proyecto No Existe')
        return res.status(404).json({ smg: error.message })
    }
    if (projectExist.creator.toString() !== req.user._id.toString()){
        const error = new Error('No tiene Permisos Para Añadir Tareas')
        return res.status(403).json({ smg: error.message })
    }

    try {
        const newTareaAlmacenada = await Tarea.create(req.body)
        res.json(newTareaAlmacenada)
    } catch (error) {
        console.log(error)
    }
}

const obtenerTarea = async (req, res) => {
    const { id } = req.params
    const tareaExist = await Tarea.findById(id).populate("project")

    if (!tareaExist){
        const error = new Error('La Tarea No fue Encontrada')
        return res.status(404).json({ smg: error.message })
    }
    if (tareaExist.project.creator.toString() !== req.user._id.toString()){
        const error = new Error('Accion No Válida')
        return res.status(403).json({ smg: error.message })
    }
    res.json(tareaExist)
}

const editarTarea = async (req, res) => {
    const { id } = req.params
    const tareaExist = await Tarea.findById(id).populate("project")

    if (!tareaExist){
        const error = new Error('La Tarea No fue Encontrada')
        return res.status(404).json({ smg: error.message })
    }
    if (tareaExist.project.creator.toString() !== req.user._id.toString()){
        const error = new Error('Accion No Válida')
        return res.status(403).json({ smg: error.message })
    }
    tareaExist.nombre = req.body.nombre || tareaExist.nombre
    tareaExist.description = req.body.description || tareaExist.description
    tareaExist.prioridad = req.body.prioridad || tareaExist.prioridad
    tareaExist.fechaEntrega = req.body.fechaEntrega || tareaExist.fechaEntrega
    try {
        const updateTarea = await tareaExist.save()
        res.json(updateTarea)
    } catch (error) {
        console.log(error)
    }
}

const eliminarTarea = async (req, res) => {
    const { id } = req.params
    const tareaExist = await Tarea.findById(id).populate("project")

    if (!tareaExist){
        const error = new Error('La Tarea No fue Encontrada')
        return res.status(404).json({ smg: error.message })
    }
    if (tareaExist.project.creator.toString() !== req.user._id.toString()){
        const error = new Error('Accion No Válida')
        return res.status(403).json({ smg: error.message })
    }
    try {
        await tareaExist.deleteOne()
        res.json({ smg: 'Tarea Eliminada' })
    } catch (error) {
        console.log(error)
    }
}

const cambiarEstado = async (req, res) => {

}


export {
    newTarea,
    obtenerTarea,
    editarTarea,
    eliminarTarea,
    cambiarEstado,
}
