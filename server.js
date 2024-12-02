const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body
// const PORT = process.env.PORT || 3000;


// Import the router files
const employeeRoutes = require('./router/employeeRoutes');
const menuRoutes = require('./router/menuRoutes');
// Use the routers
app.use('/employee', employeeRoutes);
app.use('/menu', menuRoutes);


app.listen(3000, () => {
  console.log("listening on port 3000");
})
