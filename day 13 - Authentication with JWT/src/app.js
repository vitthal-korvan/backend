const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json());
app.use(cookieParser())

/*

POST /auth/register
POST /auth/login
GET /auth/user
GET /auth/logout

*/


app.use("/auth", authRoutes);
//we create a routes in which we use for
// app.use("/product", productRoutes)
// app.use("/customer", customerRoutes);

module.exports = app;
