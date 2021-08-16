import express from 'express'
import {form, uploadFile} from '../middlewares/fileHandle'
import UserController from '../controllers/employeeController'
import CSVController from '../controllers/csvController'

const router = express.Router()


router.get('/all-employee', UserController.getAllUser)
router.get('/employee/:id', UserController.getUser)
router.post('/add-employee', form, UserController.addUser)
router.post('/upload', uploadFile, CSVController.upload)




export default router

