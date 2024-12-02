const mongoose = require('mongoose');

// Define the employee schema
const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef', 'waiter', 'manager'],
        required: true
    },
    mobile:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required: true
    }

});

// Create employee model
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
