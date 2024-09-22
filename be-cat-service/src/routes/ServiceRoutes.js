const ServiceRouter = require("express").Router();
const serviceController = require("../controllers/ServiceController");

ServiceRouter.post("/create", serviceController.createServices);
ServiceRouter.get("/read", serviceController.readServices);
ServiceRouter.put("/update/:id", serviceController.updateServices);
ServiceRouter.delete("/delete/:id", serviceController.deleteServices);
ServiceRouter.get("/sort", serviceController.sortServices);
ServiceRouter.get("/search", serviceController.findServicesByKeyword);

module.exports = ServiceRouter;

