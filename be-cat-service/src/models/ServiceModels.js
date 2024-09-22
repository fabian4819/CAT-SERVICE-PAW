const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    
    serviceType: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date, 
        required: true
    },
    price: {
        type: String, 
        required: true
    },
    customerID: {
        type: Number, 
        required: true
    },
    employeeID: {
        type: Number, 
        required: true
    },
    catID: {
        type: Number, 
        required: true
    },
    serviceDescription: {
        type: String, 
        required: true
    },
}); 

module.exports = mongoose.model("Service", serviceSchema);
