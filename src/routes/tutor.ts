import { Router } from 'express'
import { createTutorHandler } from '../handlers/tutor'

const router = Router()

router.get('/tutor/:id', createTutorHandler)
router.post('/tutor')
router.put('/tutor/:id')
router.delete('/tutor/:id')
router.get('/tutors')

export default router
