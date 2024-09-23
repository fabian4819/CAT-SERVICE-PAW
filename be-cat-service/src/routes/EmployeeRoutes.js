const EmployeeRouter = require("express").Router();
const employeeController = require("../controllers/EmployeeController");

EmployeeRouter.post("/create", employeeController.createEmployee);
EmployeeRouter.get("/read", employeeController.readEmployee);
EmployeeRouter.put("/update/:id", employeeController.updateEmployee);
EmployeeRouter.delete("/delete/:id", employeeController.deleteEmployee);
EmployeeRouter.get("/sort", employeeController.sortEmployees);
EmployeeRouter.get("/search", employeeController.findEmployeesByKeyword);

module.exports = EmployeeRouter;
