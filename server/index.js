import express from 'express'
import cors from 'cors'
import path from 'path'
import {fileURLToPath} from 'url';
import router from './Routes/RoutesUpload.js'
const app = express()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//http://localhost:8080/files/upload/1669299904456_caminhaop.jpg
app.use('/files', express.static(path.join(__dirname, 'public')))


app.use(express.json())
app.use(cors());

app.use('/', router)

app.listen(8080, () => {
    console.log('rondando na porta 8080')
})
