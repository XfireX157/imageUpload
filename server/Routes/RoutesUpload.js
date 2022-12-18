import express from "express";
const router = express.Router()
import {upload} from '../middlewares/uploadimg.js'
import { getUsers , addUplaod, deleteUpload, updateUpload } from "../Controllers/UploadController.js";

router.get('/', getUsers)

router.post('/', upload.single('image'), addUplaod)

router.delete('/:id', deleteUpload)

router.put('/:id', upload.single('image') ,updateUpload)

export default router