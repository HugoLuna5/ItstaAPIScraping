import createHttpError from 'http-errors';
import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import morgan from 'morgan';

import auth from './src/routes/auth'

dotenv.config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(passport.initialize());


app.get("/", function (req: Request, res: Response) {
    res.send('Hello, TypeScript Node Express!');
    //res.redirect("https://google.com.mx");
  });


// Calling routes


app.use('/api/v1/auth', auth);


  /**
 * End Server Routes
 */




  // catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: any) {
    next(createHttpError(404));
  });
  
  // error handler
  app.use(function (err: any, req: Request, res: Response, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
  


  export default app