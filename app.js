import express from 'express'
const app=express() 
import cookieParser from 'cookie-parser'
import {connectDatabase} from './config/dbConnect.js'
import dotenv from 'dotenv'
 dotenv.config({path:'config/.env'})
const port =process.env.PORT

connectDatabase()

import { restaurant } from './routes/restaurant.js';
import { cuisines } from './routes/cuisines.js'
import { auth } from './routes/user.js'

app.use(cookieParser())
app.use(express.json())
app.use('/api/v1',restaurant)
app.use('/api/v1',cuisines)
app.use('/api/v1',auth)


app.listen(port,()=>{
  console.log(`Server is working on http://localhost:${port}`)
})

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  app.use((req, res, next) => {
    res.json({
      success: true,
      errorCode: 0,
      description: "SUCCESS",
      info: {},
    });
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.locals.message = err.message;
    res.json({
      success: false,
      errorCode: err.errorCode || 1,
      description:
        err.message || "Something went wrong. Please try again later.",
      info: null,
    });
  });

export default app;