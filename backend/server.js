import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import waveRoutes from './routes/waveRoutes.js'

dotenv.config()

connectDB()

const app = express()



app.use('/api/waves', waveRoutes)

const __dirname = path.resolve()

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve( __dirname, 'frontend', 'build', 'index.html' )))
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))

