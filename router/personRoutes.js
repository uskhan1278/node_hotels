const express = require('express')
const router = express.Router();
const Person = require('./../models/person')

// Submit Person Data 
router.post('/', async (req, res) => {
    try {
      const data = req.body // Assuming the request body contains the person data
  
      // Create a new Person document using the Mongoose model
      const newPerson = new Person(data)
  
      // Save the new person to the database 
      const response = await newPerson.save();
      console.log('Data Saved');
      res.status(200).json(response)
    } 
    catch (err) {
          console.log(err);
          res.status(500).json({error: 'Internal Sever Error'});
    }
  })

// GET Method to get person
router.get('/',async (req, res) => {
    try{
      const data = await Person.find()
      console.log('data fetched')
      res.status(200).json(data) 
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Sever Error'});
    }
  })


// Get Person Data According to Work Type
router.get('/:workType', async (req, res) => {
    try{
      const workType = req.params.workType;
      if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
  
        const response = await Person.find({work: workType});
        console.log('response fatched');
        res.status(200).json(response);
      }else{
        res.status(404).json({error: 'Invalid work type'});
      }
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Sever Error'});
    }
  })

  // Update Person Data
  router.put('/:id', async(req, res) =>{
    try{
        const personId = req.params.id; // Exteact the Id from the URL parameter
        const updatePersonData = req.body; //Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatePersonData,  {
          new: true, // Return the updated document 
          runValidators: true, // Run Mongoose validation
        })

        if(!response){
          return res.status(404).json({error: 'Person not found'});
        }

        console.log('Data Updated');
        res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Sever Error'});
    }
  })


// Delete Peron Data
router.delete('/:id', async(req, res) => {
  try{
    const personId = req.params.id; // Exteact the Id from the URL parameter

    // Assuming you have a Person model
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(404).json({error:'Person not found' });
    }
    console.log('Data Delete');
    res.status(200).json({message: 'Person Deleted Successfully'});
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Sever Error'});
  }
})

  module.exports = router;