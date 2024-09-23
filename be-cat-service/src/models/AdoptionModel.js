const mongoose = require("mongoose");

const AdoptionSchema = new mongoose.Schema({
  adoptionDate: {
    type: Date,  // Tipe data untuk tanggal
    required: true,
  },
  adoptionFee: {
    type: mongoose.Schema.Types.Decimal128,  // Menggunakan Decimal untuk tipe data desimal
    required: true,
  },
  customerID: {
    type: Number,  // Foreign Key ke entitas lain, seperti Customer
    required: true,
  },
  catID: {
    type: Number,  // Foreign Key ke entitas lain, seperti Cat
    required: true,
  },
});

module.exports = mongoose.model("Adoption", AdoptionSchema);
