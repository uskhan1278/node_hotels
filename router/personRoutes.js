const express = require('express')
const router = express.Router();
const Employee = require('../models/employee')

// Submit employee Data 
router.post('/', async (req, res) => {
    try {
      const data = req.body // Assuming the request body contains the employee data
  
      // Create a new employee document using the Mongoose model
      const newEmployee = new Employee(data)
  
      // Save the new employee to the database 
      const response = await newEmployee.save();
      console.log('Data Saved');
      res.status(200).json(response)
    } 
    catch (err) {
          console.log(err);
          res.status(500).json({error: 'Internal Sever Error'});
    }
  })

// GET Method to get employee
router.get('/',async (req, res) => {
    try{
      const data = await Employee.find()
      console.log('data fetched')
      res.status(200).json(data) 
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Sever Error'});
    }
  })


// Get employee Data According to Work Type
router.get('/:workType', async (req, res) => {
    try{
      const workType = req.params.workType;
      if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
  
        const response = await Employee.find({work: workType});
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

  // Update employee Data
  router.put('/:id', async(req, res) =>{
    try{
        const employeeId = req.params.id; // Exteact the Id from the URL parameter
        const updateEmployeeData = req.body; //Updated data for the employee

        const response = await Employee.findByIdAndUpdate(employeeId, updateEmployeeData,  {
          new: true, // Return the updated document 
          runValidators: true, // Run Mongoose validation
        })

        if(!response){
          return res.status(404).json({error: 'employee not found'});
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
    const employeeId = req.params.id; // Exteact the Id from the URL parameter

    // Assuming you have a employee model
    const response = await Employee.findByIdAndDelete(employeeId);
    if(!response){
      return res.status(404).json({error:'employee not found' });
    }
    console.log('Data Delete');
    res.status(200).json({message: 'employee Deleted Successfully'});
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Sever Error'});
  }
})

  module.exports = router;
