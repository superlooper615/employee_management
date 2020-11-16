
const { where } = require('sequelize');

const db = require('../config/db.config.js');

const boatrental = db.boatrental;
//const Employeetype = db.employeetype;
const Op = db.Sequelize.Op;

//Post a Customer
exports.create = (req, res) => {	
	// Save to MySQL database
	boatrental.create({ 
		boatRentalId: req.body.boatRentalId,
		boatRentalStatusId: req.body.boatRentalStatusId,
		boatId:  req.body.boatId,
		employeeId:  req.body.employeeId,
		customerId:  req.body.customerId,
		bookingDate: req.body.bookingDate,
		bookingTime:  req.body.bookingTime,
		passengers:  req.body.passengers,
		requestedCoolers:  req.body.requestedCoolers,
		specialNotes:  req.body.specialNotes,

	}).then(boatrental => {		
		// Send created customer to client
		res.send(boatrental);
	});
};
 
// FETCH all Customers
exports.findAll = (req, res) => {
	boatrental.findAll().then(boatrental => {
		
		// Send all customers to Client
		res.send(boatrental);
	});

};

// // Find a Customer by Id
// exports.findOne = (req, res) => {
// 	const id = req.params.id;
  
// 	Employee.findByPk(id)
// 	  .then(data => {
// 		res.send(data);
// 	  })
// 	  .catch(err => {
// 		res.status(500).send({
// 		  message: "Error retrieving Tutorial with id=" + id
// 		});
// 	  });
//   };
 
// // Update a Customer
// exports.update = (req, res) => {
// 	const id = req.params.customerId;
// 	Customer.update( { firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age }, 
// 					 { where: {id: req.params.customerId} }
// 				   ).then(() => {
// 					 res.status(200).send("updated successfully a customer with id = " + id);
// 				   });
// };
 
// // Delete a Customer by Id
// exports.delete = (req, res) => {
// 	const id = req.params.customerId;
// 	Customer.destroy({
// 	  where: { id: id }
// 	}).then(() => {
// 	  res.status(200).send('deleted successfully a customer with id = ' + id);
// 	});
// };