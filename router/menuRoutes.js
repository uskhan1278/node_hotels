const express = require('express')
const router = express.Router()
const MenuItem = require('./../models/manu') 


// Post Manu Item
router.post('/', async (req, res) => {
    try {
      const data = req.body // Assuming the request body contains the person data
  
      // Create a new Person document using the Mongoose model
      const newManu = new MenuItem(data)
  
      // Save the new manu to the database 
      const response = await newManu.save();
      console.log('Data Saved');
      res.status(200).json(response)
    } 
    catch (err) {
          console.log(err);
          res.status(500).json({error: 'Internal Sever Error'});
    }
  })
  
  
  // GET Method to get Manu Item
  router.get('/',async (req, res) => {
    try{
      const data = await MenuItem.find()
      console.log('data fetched')
      res.status(200).json(data) 
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Sever Error'});
    }
  })

  module.exports = router;