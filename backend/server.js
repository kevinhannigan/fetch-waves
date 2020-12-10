import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import bodyParser from 'body-parser'
import session from 'express-session'
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose'
import cors from 'cors'

const MongoStore = connectMongo(session);

import waveRoutes from './routes/waveRoutes.js'
import safetyRoutes from './routes/safetyRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(cors())

app.use(
    session({
      secret: "secretKey",
      resave: false,
      saveUninitialized: true,
      user_id: undefined,
      store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
  );

app.use(bodyParser.json());

app.use('/api/waves', waveRoutes)

app.use('/api/safety', safetyRoutes)

app.use('/api/users', userRoutes)

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

