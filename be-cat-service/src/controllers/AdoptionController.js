const Adoption = require("../models/AdoptionModel");

exports.createAdoption = async (req, res) => {
  const { adoptionDate, adoptionFee, customerID, catID } = req.body;

  const adoption = new Adoption({
    adoptionDate,
    adoptionFee,
    customerID,
    catID
  });

  adoption
    .save()
    .then(() => {
      res.status(200).json({
        message: "Berhasil menambahkan adopsi!"
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err
      });
    });
};
exports.readAdoption = async (req, res) => {
    Adoption.find() // Find all adoptions
      .then((adoptions) => {
        res.status(200).json({
          data: adoptions
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err
        });
      });
  };
  exports.updateAdoption = async (req, res) => {
    const { id } = req.params; // MongoDB ID in params
    const { adoptionDate, adoptionFee, customerID, catID } = req.body;
  
    Adoption.findByIdAndUpdate(id, {
      adoptionDate,
      adoptionFee,
      customerID,
      catID
    })
      .then(() => {
        res.status(200).json({
          message: "Berhasil memperbarui data adopsi!"
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err
        });
      });
  };
  exports.deleteAdoption = async (req, res) => {
    const { id } = req.params; // MongoDB ID in params
  
    Adoption.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json({
          message: "Data adopsi berhasil dihapus :("
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err
        });
      });
  };
  exports.sortAdoptions = async (req, res) => {
    const { sortBy, sortOrder } = req.query;
    const order = sortOrder === 'desc' ? -1 : 1;
  
    const allowedSortFields = ['adoptionDate', 'adoptionFee', 'customerID', 'catID'];
    const isValidSortField = allowedSortFields.includes(sortBy);
  
    if (!isValidSortField) {
      return res.status(400).json({
        error: "Field tidak valid. Silakan sorting berdasarkan: adoptionDate, adoptionFee, customerID, catID."
      });
    }
  
    try {
      const adoptions = await Adoption.find().sort({ [sortBy]: order });
      res.status(200).json({
        data: adoptions
      });
    } catch (err) {
      res.status(400).json({
        error: err.message || "Tidak ditemukan adopsi dengan data tersebut."
      });
    }
  };
  exports.findAdoptionsByKeyword = async (req, res) => {
    const { keyword } = req.query;
  
    if (!keyword) {
      return res.status(400).json({
        error: "Query tidak boleh kosong!"
      });
    }
  
    try {
      const regex = new RegExp(keyword, "i");
      const adoptions = await Adoption.find({
        $or: [
          { customerID: regex },
          { catID: regex }
        ]
      });
  
      res.status(200).json({
        data: adoptions
      });
    } catch (err) {
      res.status(400).json({
        error: err.message || "Terjadi kesalahan ketika mencoba mencari data adopsi."
      });
    }
  };
    