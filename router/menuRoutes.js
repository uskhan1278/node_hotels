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
  
  
  //  Get Manu Item
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


  // Update Menu Data
  router.put('/:id', async(req, res) =>{
    try{
        const menuItemId = req.params.id; // Exteact the Id from the URL parameter
        const updateMenuData = req.body; //Updated data for the menu

        const response = await MenuItem.findByIdAndUpdate(menuItemId, updateMenuData,  {
          new: true, // Return the updated document 
          runValidators: true, // Run Mongoose validation
        })

        if(!response){
          return res.status(404).json({error: 'Menu Item not found'});
        }

        console.log('Data Updated');
        res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Sever Error'});
    }
  })

  // Delete Menu Item Data
router.delete('/:id', async(req, res) => {
  try{
    const menuItemId = req.params.id; // Exteact the Id from the URL parameter

    // Assuming you have a Menu model
    const response = await MenuItem.findByIdAndDelete(menuItemId);
    if(!response){
      return res.status(404).json({error:'Menu Item not found' });
    }
    console.log('Data Delete');
    res.status(200).json({message: 'Menu Item Deleted Successfully'});
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Sever Error'});
  }
})


// this is testing 
  module.exports = router;
