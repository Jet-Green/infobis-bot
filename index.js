import * as dotenv from 'dotenv'
import TelegramApi from './bot.js'

dotenv.config();

import express from 'express'
const app = express()
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'

import mongoose from 'mongoose'

// ROUTES
app.get('/', (req, res) => {
  return res.json('hi')
})

app.use(cors({
  origin: [process.env.CLIENT_URL, "https://plpo.ru", "https://gorodaivesi.ru", "http://localhost:3030", "http://localhost:5173"],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: true
}));


// ROUTES

// START SERVER
function startServer() {
  try {
    app.listen(process.env.PORT, () => { console.log(`Server is running on http://localhost:${process.env.PORT}`); })
  } catch (err) {
    console.error('Error while starting server: ', err);
  }
}
function mongoConnect() {
  
  mongoose.connect(process.env.MONGO_URL)
  
  const db = mongoose.connection;
  db.once('open', function () {
    console.log('connected: ', process.env.MONGO_URL);
  });
}

mongoConnect()
startServer()
TelegramApi.setupBot();