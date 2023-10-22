import express, { Express, Router, Application } from 'express'
import { connectDatabase } from './database';
import 'dotenv/config'
import "reflect-metadata"
import fs,{ readdirSync } from 'fs'

import morgan from 'morgan'

import cors from 'cors'

const app: Application = express()

const port = 4000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(cors())

//UserRoute
const User = fs.readdirSync("./routes/users");

User.forEach((file) => {
  const route = require(`./routes/users/${file}`).default;
  app.use("/api/users", route);
});

//Ticket
const Ticket = fs.readdirSync("./routes/ticket");

Ticket.forEach((file) => {
  const route = require(`./routes/ticket/${file}`).default;
  app.use("/api/ticket", route);
});




app.listen (port, async () => {
    await connectDatabase();
    console.log(`Server runing on port ${port}`)
})