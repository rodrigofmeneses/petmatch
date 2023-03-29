import { Router } from 'express'

const router = Router()

router.get('/pet/:id')
router.post('/pet')
router.put('/pet/:id')
router.delete('/pet/:id')
router.get('/pets')

export default router
