const router = require("express").Router();

const CustomersRoutes = require("./customer");




router.use("/Customer", CustomersRoutes);



module.exports = router;
