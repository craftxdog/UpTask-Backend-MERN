import express from 'express'
import {
    newTarea,
    obtenerTarea,
    editarTarea,
    eliminarTarea,
    cambiarEstado,
} from '../controllers/tareasController.js'
import checkAuth from '../middleware/checkAuth.js'

const route = express.Router()

route.post('/', checkAuth, newTarea)
route.route('/:id').get(checkAuth, obtenerTarea).put(checkAuth, editarTarea).delete(checkAuth, eliminarTarea)
route.post('/estado/:id', checkAuth, cambiarEstado)

export default route