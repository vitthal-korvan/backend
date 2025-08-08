const express = require("express");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
//we create a routes in which we use for
// app.use("/product", productRoutes)
// app.use("/customer", customerRoutes);

module.exports = app;
