const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body


// Import the router files
const personRoutes = require('./router/personRoutes');
const menuRoutes = require('./router/menuRoutes');
// Use the routers
app.use('/person', personRoutes);
app.use('/manu', menuRoutes);


app.listen(3000, () => {
  console.log("listening on port 3000");
})
