const Customer = require("../models/CustomerModels");

// Create a new customer
exports.createCustomer = async (req, res) => {
    const { name, email, phone, address } = req.body;

    const customer = new Customer({
        name,
        email,
        phone,
        address,
    });
    customer
        .save()
        .then(() => {
            res.status(200).json({
                message: "User created successfully!",
                data: name,
            });
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
            });
        });
};

// GET ALL CUSTOMER
exports.readCustomer = async (req, res) => {
    Customer.find() // Find all data in the cat database
        .then((customers) => {
            res.status(200).json({
                // Logs in response body
                data: customers,
            });
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
            });
        });
};

// UPDATE CUSTOMER
exports.updateCustomer = async (req, res) => {
    const { id } = req.params; // Automatically made by MongoDB, Params = in URL request
    const { name, email, phone, address} = req.body;

    Customer.findByIdAndUpdate(id, {
        name,
        email,
        phone,
        address,
    })
        .then(() => {
            res.status(200).json({
                message: "Berhasil memperbarui data customer!",
            });
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
            });
        });
};

// DELETE CUSTOMER :(
exports.deleteCustomer = async (req, res) => {
    const { id } = req.params; // Pass _id in params

    Customer.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({
                message: "Kucing berhasil dihapus :(",
            });
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
            });
        });
};

// SORT CUSTOMERS BY SPECIFIED FIELD
exports.sortCustomers = async (req, res) => {
    const { sortBy, sortOrder } = req.query;

    // Default order is ascending
    const order = sortOrder === "desc" ? -1 : 1; // descending if sortOrder is 'desc'

    const allowedSortFields = ["name"];
    const isValidSortField = allowedSortFields.includes(sortBy);

    if (!isValidSortField) {
        return res.status(400).json({
            error:
                "Field tidak valid. Silahkan sorting berdasarkan: name.",
        });
    }

    try {
        const customers = await Customer.find().sort({ [sortBy]: order });
        res.status(200).json({
            data: customers, // fix typo from 'cats' to 'customers'
        });
    } catch (err) {
        res.status(400).json({
            error: err.message || "Tidak ditemukan customer dengan data tersebut.",
        });
    }
};


// FIND CUSTOMERS BY KEYWORD
exports.findCustomersByKeyword = async (req, res) => {
    const { keyword } = req.query;
    
    if (!keyword) {
        return res.status(400).json({
            error: "Query tidak boleh kosong!",
        });
    }

    try {
        const regex = new RegExp(keyword, "i"); // Case-insensitive search
        const customers = await Customer.find({
            $or: [{ name: regex }]
        });

        res.status(200).json({
            data: customers, // Change 'cats' to 'customers'
        });
    } catch (err) {
        res.status(400).json({
            error: err.message || "Terjadi kesalahan ketika mencoba untuk mencari customer.",
        });
    }
};