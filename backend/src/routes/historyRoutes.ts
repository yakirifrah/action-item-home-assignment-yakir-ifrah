import { Router } from 'express'
import { deleteUser, updateUser, saveUser, getAllHistoryUsers } from '../controllers/History.controller'

const router = Router()
router.get('/users', getAllHistoryUsers)
router.post('/user', saveUser)
router.put('/user', updateUser)
router.delete('/user', deleteUser)
export default router
