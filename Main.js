import express from "express";
import contactRoutes from "./routes/contact.routes.js";
import { connectDB } from "./config/database.js";

//Database Connections
connectDB();
//Express App
const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//Routes
app.use(contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
