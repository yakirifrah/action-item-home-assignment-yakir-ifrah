import { Router } from 'express'
import { getRandomUsers } from '../controllers/User.controller'

const router = Router()
router.get('/users', getRandomUsers)
export default router
