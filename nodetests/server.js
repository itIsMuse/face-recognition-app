import express from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

    app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname + '/public'))

const PORT = 4000
app.listen(PORT, () => console.log(`your file is working in ${PORT}`))