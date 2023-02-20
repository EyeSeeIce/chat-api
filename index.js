import express from 'express'
import sequelize from './db.js'
import { authRoute, categoryRoute, goalRoute, taskRoute } from './routes/index.js'
import GoalElementModel from './models/GoalElementModel.js'

import cors from 'cors'
import TaskModel from './models/TaskModel'
import { authOnly } from './middlewares'
import GoalModel from './models/GoalModel'
import CategoryModel from './models/CategoryModel'


require('dotenv').config({ path: `.env` })

const app = express()

app.use(
  cors({
      origin: '*',
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/task', [authOnly], taskRoute)
app.use('/api/v1/goal', [authOnly], goalRoute)
app.use('/api/v1/category', [authOnly], categoryRoute)
app.use('/api/v1/auth', authRoute)


app.get('/api/v1/sync', async (req, res) => {
    await CategoryModel.sync({ force: true });
    res.send('synced')
})

app.listen(process.env.port, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})