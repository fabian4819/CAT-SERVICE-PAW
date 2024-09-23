const CustomerRouter = require("express").Router();
const customerController = require("../controllers/CustomerController");


CustomerRouter.post("/create", customerController.createCustomer);
CustomerRouter.get("/read", customerController.readCustomer);
CustomerRouter.put("/update/:id", customerController.updateCustomer);
CustomerRouter.delete("/delete/:id", customerController.deleteCustomer);
CustomerRouter.get("/sort", customerController.sortCustomers);
CustomerRouter.get("/search", customerController.findCustomersByKeyword);

module.exports = CustomerRouter;
