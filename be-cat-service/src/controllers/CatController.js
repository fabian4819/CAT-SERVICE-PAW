// REQUIRE YOU TO USE THE MODEL
const Cat = require("../models/CatModels");

// CRUD ENDPOINTS
// CREATE USER
exports.createCat = async (req, res) => {
  const { name, breed, age, gender, vaccinationStatus, description } = req.body; // Get data from request body.

  const cat = new Cat({
    name,
    breed,
    age,
    gender,
    vaccinationStatus,
    description
  });
  cat
    .save()
    .then(() => {
      res.status(200).json({
        message: "Berhasil menambahkan kucing!",
        data: name
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err
      });
    });
};

// GET ALL CAT
exports.readCat = async (req, res) => {
  Cat.find() // Find all data in the cat database
    .then((cats) => {
      res.status(200).json({ // Logs in response body
        data: cats
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err
      });
    });
};

// UPDATE CAT
exports.updateCat = async (req, res) => {
  const { id } = req.params; // Automatically made by MongoDB, Params = in URL request
  const { name, breed, age, gender, vaccinationStatus, description } = req.body;

  Cat.findByIdAndUpdate(id, { name, breed, age, gender, vaccinationStatus, description })
    .then(() => {
      res.status(200).json({
        message: "Berhasil memperbarui data kucing!"
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err
      });
    });
};

// DELETE CAT :(
exports.deleteCat = async (req, res) => {
  const { id } = req.params; // Pass _id in params

  Cat.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({
        message: "Kucing berhasil dihapus :("
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err
      });
    });
};

// SORT CATS BY SPECIFIED FIELD
exports.sortCats = async (req, res) => {
    const { sortBy, sortOrder } = req.query;
  
    // Default is order by ascending
    const order = sortOrder === 'desc' ? -1 : 1; // if specified 'desc' in the parameter it will use -1 -> descending order in try block
  
    const allowedSortFields = ['name', 'age', 'gender', 'vaccinationStatus', 'breed'];
    const isValidSortField = allowedSortFields.includes(sortBy);
  
    if (!isValidSortField) {
      return res.status(400).json({
        error: "Field tidak valid. Silahkan sorting berdasarkan: name, age, gender, vaccinationStatus, breed."
      });
    }
  
    try {
      const cats = await Cat.find().sort({ [sortBy]: order });
      res.status(200).json({
        data: cats
      });
    } catch (err) {
      res.status(400).json({
        error: err.message || "Tidak ditemukan kucing dengan data tersebut."
      });
    }
  };  

  // FIND CATS BY KEYWORD
exports.findCatsByKeyword = async (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({
        error: "Query tidak boleh kosong!"
      });
    }
  
    try {
      const regex = new RegExp(keyword, "i"); // menggunakan fungsi regex bawaan mongoose dan setting jd case-insensitive
      const cats = await Cat.find({
        $or: [
          { name: regex },
          { breed: regex },
          { description: regex }
        ]
      });
  
      res.status(200).json({
        data: cats
      });
    } catch (err) {
      res.status(400).json({
        error: err.message || "Terjadi kesalahan ketika mencoba untuk mencari kucing."
      });
    }
  };  