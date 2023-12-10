import express from 'express'
import {
    obtenerProjects,
    newProject,
    obtenerProject,
    editProject,
    deleteProject,
    addColaboradorProject,
    deleteColaboradorProject,
} from '../controllers/projectsController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router();

router.route('/').get(checkAuth, obtenerProjects).post(checkAuth, newProject);
router.route('/:id').get(checkAuth, obtenerProject).put(checkAuth, editProject).delete(checkAuth, deleteProject);
router.post('/agregar-colaborador/:id', checkAuth, addColaboradorProject);
router.post('/eliminar-colaborador/:id', checkAuth, deleteColaboradorProject);

export default router;