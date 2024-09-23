const Employee = require("../models/EmployeeModels");
  
exports.createEmployee = async (req, res) => {
    const { name, email, phone, address } = req.body;

    const employee = new Employee({
        name,
        email,
        phone,
        address,
    });
    employee
        .save()
        .then(() => {
            res.status(200).json({
                message: "Karyawan berhasil ditambahkan!",
                data: name,
            });
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
            });
        });
};

exports.readEmployee = async (req, res) => {
    Employee.find() 
        .then((employees) => {
            res.status(200).json({
                data: employees,
            });
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
            });
        });
};


exports.updateEmployee = async (req, res) => {
    const { id } = req.params; 
    const { name, email, phone, address } = req.body;

    Employee.findByIdAndUpdate(id, {
        name,
        email,
        phone,
        address,
    })
        .then(() => {
            res.status(200).json({
                message: "Berhasil memperbarui data karyawan!",
            });
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
            });
        });
};


exports.deleteEmployee = async (req, res) => {
    const { id } = req.params; 

    Employee.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({
                message: "Karyawan berhasil dihapus :(",
            });
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
            });
        });
};


exports.sortEmployees = async (req, res) => {
    const { sortBy, sortOrder } = req.query;

    // Default order is ascending
    const order = sortOrder === "desc" ? -1 : 1;

    const allowedSortFields = ["name"];
    const isValidSortField = allowedSortFields.includes(sortBy);

    if (!isValidSortField) {
        return res.status(400).json({
            error:
                "Field tidak valid. Silahkan sorting berdasarkan: name.",
        });
    }

    try {
        const employees = await Employee.find().sort({ [sortBy]: order });
        res.status(200).json({
            data: employees,
        });
    } catch (err) {
        res.status(400).json({
            error: err.message || "Tidak ditemukan karyawan dengan data tersebut.",
        });
    }
};

exports.findEmployeesByKeyword = async (req, res) => {
    const { keyword } = req.query;

    if (!keyword) {
        return res.status(400).json({
            error: "Query tidak boleh kosong!",
        });
    }

    try {
        const regex = new RegExp(keyword, "i");
        const employees = await Employee.find({
            $or: [
                { name: regex },
                { position: regex}
            ]
        });

        res.status(200).json({
            data: employees,
        });
    } catch (err) {
        res.status(400).json({
            error: err.message || "Terjadi kesalahan ketika mencoba untuk mencari karyawan.",
        });
    }
};