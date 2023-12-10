import Project from "../models/Projects.js"
import Tarea from "../models/Tareas.js"

const obtenerProjects = async (req, res) => {
    const projects = await Project.find().where('creator').equals(req.user)
    res.json(projects)
}

const newProject = async (req, res) => {
    const project = new Project(req.body)
    project.creator = req.user._id

    try {
        const projectAlmacenado = await project.save()
        res.json(projectAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerProject = async (req, res) => {
    const { id } = req.params
    const project = await Project.findById(id)
    
    if(!project){
        const error = new Error('Proyecto No Encontrado');
        return res.status(404).json({ msg: error.message });
    }
    if (project.creator.toString() !== req.user._id.toString()){
        const error = new Error('Acción No Válida');
        return res.status(401).json({ msg: error.message });
    }
    // Obtener las tareas del proyecto
    const tareas = await Tarea.find().where('project').equals(project._id)

    res.json({
        project,
        tareas,
    });
}

const editProject = async (req, res) => {
    const { id } = req.params
    const project = await Project.findById(id)
    
    if(!project){
        const error = new Error('Proyecto No Encontrado');
        return res.status(404).json({ msg: error.message });
    }
    if (project.creator.toString() !== req.user._id.toString()){
        const error = new Error('Acción No Válida');
        return res.status(401).json({ msg: error.message });
    }

    project.nombre = req.body.nombre || project.nombre;
    project.description = req.body.description || project.description;
    project.fechaEntrega = req.body.fechaEntrega || project.fechaEntrega;
    project.customer = req.body.customer || project.customer;

    try {
        const updateProject = await project.save()
        res.json(updateProject)
    } catch (error) {
        console.log(error)
    }
}

const deleteProject = async (req, res) => {
    const { id } = req.params
    const project = await Project.findById(id)

    if(!project){
        const error = new Error('Proyecto No Encontrado');
        return res.status(404).json({ msg: error.message });
    }
    if (project.creator.toString() !== req.user._id.toString()){
        const error = new Error('Acción No Válida');
        return res.status(401).json({ msg: error.message });
    }
    try {
        await project.deleteOne()
        res.json({ smg: 'Proyecto Eliminado' })
    } catch (error) {
        console.log(error)
    }
}

const addColaboradorProject = async (req, res) => {

}

const deleteColaboradorProject = async (req, res) => {

}

// const obtenerTareasProject = async (req, res) => {
//     const { id } = req.params;
//     const projectExist = await Project.findById(id)

//     if (!projectExist){
//         const error = new Error('Proyecto No Encontrado');
//         return res.status(404).json({ msg: error.message });
//     }

//     const tareas = await Tarea.find().where('project').equals(id)
//     res.json(tareas)
// }

export {
    obtenerProjects,
    newProject,
    obtenerProject,
    editProject,
    deleteProject,
    addColaboradorProject,
    deleteColaboradorProject,
}