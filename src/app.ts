import express from "express";
import { Request, Response, NextFunction } from "express";
const app = express();
import bodyParser from "body-parser";
import connectorDb from "./Utils/DbConnector";
import * as dotenv from "dotenv";
import UserRoute from "./Routes/User";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
dotenv.config();

app.use(bodyParser.json());
//morgan used for logging
app.use(morgan("dev"));
app.use(morgan<Request, Response>("dev"));

const dbConnectionString: string = "mongodb://localhost:27017/MyDb";

connectorDb(dbConnectionString);

//user route
app.use("/user", UserRoute);

//swagger ui
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));  
//404 response
app.use((error: any, res: Response, next: NextFunction) => {
  try {
    res.status(404).send("Resource not found");
  } catch (error) {
    next(error);
  }
});

app.use((error: any, res: Response, next: NextFunction) => {
  try {
    const status = error.status || 500;
    const message =
      error.message ||
      "There was an error while processing your request, please try again";
    return res.status(status).send({
      status,
      message,
    });
  } catch (error) {
    next(error);
  }
});
const port = 3000;
app.listen(port, () => {
  console.log(`Application started on ${port}...`);
});

export default app;
