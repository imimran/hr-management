import express from 'express'

import {form, uploadFile} from '../middlewares/fileHandle'
import validation from '../middlewares/validation'
import UserController from '../controllers/employeeController'
import CSVController from '../controllers/csvController'
import MailController from '../controllers/mailController'

const router = express.Router()


router.get('/all-employee', UserController.getAllUser)
router.get('/employee/:id', UserController.getUser)
router.post('/add-employee', form,   UserController.addUser)
router.post('/upload', uploadFile, CSVController.upload)

router.post('/send-bulk-message', form,  MailController.bulkMessgeSend);
router.post('/send-to-all', form,  MailController.MessgeSendToAll);


export default router
