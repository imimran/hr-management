import express from 'express'

import UserController from '../controllers/employeeController'

const router = express.Router()


router.get('/all-employee', UserController.getAllUser)
router.get('/employee/:id', UserController.getUser)
router.post('/add-employee', UserController.addUser)



export default router

