import 'reflect-metadata'
import express, { Express } from 'express'
import cors from 'cors'
import { getCorsConfig } from './config/Cors'
import userRoutes from './routes/userRoutes'
import historyRoutes from './routes/historyRoutes'
const app: Express = express()

//------------------------------------//
//  Middleware                        //
//------------------------------------//
app.use(cors(getCorsConfig('localdev')))
app.use(express.json())

//------------------------------------//
//  Routes                            //
//------------------------------------//
app.use('/api', userRoutes)
app.use('/api/history', historyRoutes)
export default app
