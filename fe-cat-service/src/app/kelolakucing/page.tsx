"use client";

import React, { useState, useEffect } from "react";
import {
    FaSearch,
    FaFilter,
    FaSortUp,
    FaSortDown,
    FaEllipsisH,
} from "react-icons/fa";
import axios from "axios";

const kelolaKucing = () => {
    const [isAscending, setIsAscending] = useState(true); // Menyimpan status urutan
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
        null
    ); // Menyimpan indeks baris yang terbuka dropdown-nya
    const [cats, setCats] = useState<any[]>([]); // Menyimpan data kucing
    const [searchKeyword, setSearchKeyword] = useState<string>(""); // Menyimpan keyword pencarian
    const [sortBy, setSortBy] = useState<string>("name"); // Menyimpan field pengurutan
    const [selectedCatId, setSelectedCatId] = useState<string | null>(null); // Menyimpan id kucing yang dipilih
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Menyimpan status modal
    const [modalAction, setModalAction] = useState<"edit" | "delete" | null>(
        null
    );
    const [editCatData, setEditCatData] = useState({
        name: '',
        breed: '',
        age: '',
        gender: '',
        vaccinationStatus: '',
        description: ''
    }); // Menyimpan tindakan modal

    // Fetch data kucing dari API
    const fetchCats = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/cat/read`, {
                params: {
                    sortBy,
                    sortOrder: isAscending ? "asc" : "desc",
                },
            });
            setCats(response.data.data);
        } catch (error) {
            console.error("Error fetching cats:", error);
        }
    };

    // Search and Sort
    const searchAndSortCats = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/cat/search`, {
                params: {
                    keyword: searchKeyword,
                    sortBy,
                    sortOrder: isAscending ? "asc" : "desc",
                },
            });
            setCats(response.data.data);
        } catch (error) {
            console.error("Error searching or sorting cats:", error);
        }
    };

    // Toggle dropdown
    const handleDropdownToggle = (index: number) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    // Toggle urutan pengurutan
    const handleSortOrderToggle = () => {
        setIsAscending(!isAscending);
    };

    // Handle delete cat
    const handleDeleteCat = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/cat/delete/${id}`);
            fetchCats(); // Refresh data setelah delete
        } catch (error) {
            console.error("Error deleting cat:", error);
        }
    };

    // Fungsi untuk membuka modal
    const openModal = (action: "edit" | "delete", id: string) => {
        setSelectedCatId(id);
        setModalAction(action);

        if (action === "edit") {
            const selectedCat = cats.find((cat) => cat._id === id);
            if (selectedCat) {
                setEditCatData({
                    name: selectedCat.name,
                    breed: selectedCat.breed,
                    age: selectedCat.age,
                    gender: selectedCat.gender,
                    vaccinationStatus: selectedCat.vaccinationStatus,
                    description: selectedCat.description,
                });
            }
        }

        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setSelectedCatId(null);
        setModalAction(null);
        setIsModalOpen(false);
    };

    const handleEditCat = async () => {
        try {
            await axios.put(`http://localhost:5000/cat/update/${selectedCatId}`, editCatData);
            fetchCats(); // Refresh data setelah update
            closeModal(); // Tutup modal setelah menyimpan
        } catch (error) {
            console.error("Error updating cat:", error);
        }
    };

    // Fetch data pada awal render
    useEffect(() => {
        fetchCats();
    }, []);

    // Fetch data pada perubahan searchKeyword, sortBy, atau isAscending
    useEffect(() => {
        searchAndSortCats();
    }, [searchKeyword, sortBy, isAscending]);

    return (
        <div className="p-8 bg-white min-h-screen">
            <div className="flex items-center mb-8">
                <div className="absolute top-4 left-4 flex items-center ml-10">
                    <img src="./assets/images/logo-kucing.png" alt="Kucing PAW Logo" className="mr-[1.7vw] h-[71px]" />
                    <span className="text-lg text-black font-bold text-[32px]" style={{ fontFamily: 'Jetbrains Mono' }}>Kucing PAW</span>
                </div>
            </div>
            <h2 className="text-center text-[#1c1c1c] text-4xl font-bold mt-20" style={{ fontFamily: 'Jetbrains Mono' }}>Pengelolaan Kucing</h2>
            <div className="flex items-center mb-4">
                <div className="relative flex-grow w-[406px]">
                    <input
                        type="text"
                        placeholder="Cari Kucing"
                        className="w-[415px] border-2 text-[#1c1c1c] border-[#1c1c1c] rounded-full py-2 px-4 "
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <button onClick={searchAndSortCats}>
                        <FaSearch className="absolute top-1/2 left-96 transform -translate-y-1/2 text-[#1c1c1c]" />
                    </button>
                </div>
                <button className="ml-4 p-2 w-[58px] h-[38px] px-2.5 py-[5px] bg-white rounded-[25px] border-2 border-[#1d1d21] justify-center items-center gap-1.5 inline-flex ">
                    <FaFilter className="w-6 h-6 text-[#1c1c1c]" />
                </button>
                <div className="ml-4 p-2 w-[326px] h-[38px] px-5 py-[5px] bg-white rounded-[25px] border-2 border-[#1d1d21] text-[#1d1d21] justify-start items-center gap-3 inline-flex">
                    <span>Urutkan berdasarkan:</span>
                    <select
                        className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name">Nama</option>
                        <option value="breed">Jenis</option>
                        <option value="age">Umur</option>
                    </select>
                    <button onClick={handleSortOrderToggle}>
                        {isAscending ? (
                            <FaSortUp className="text-[#1d1d21] text-xl" />
                        ) : (
                            <FaSortDown className="text-[#1d1d21] text-xl" />
                        )}
                    </button>
                </div>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b text-[#000000]">
                        <th className="py-2 px-4 text-left">ID.</th>
                        <th className="py-2 px-4 text-left">Nama Kucing</th>
                        <th className="py-2 px-4 text-left">Jenis (Breed)</th>
                        <th className="py-2 px-4 text-left">Umur</th>
                        <th className="py-2 px-4 text-left">Jenis Kelamin</th>
                        <th className="py-2 px-4 text-left">Status Vaksinasi</th>
                        <th className="py-2 px-4 text-left">Deskripsi</th>
                        <th className="py-2 px-4 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {cats.map((cat, index) => (
                        <tr
                            key={cat._id}
                            className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                } text-[#000000]`}
                        >
                            <td className="py-2 px-4">{cat._id}</td>
                            <td className="py-2 px-4">{cat.name}</td>
                            <td className="py-2 px-4">{cat.breed}</td>
                            <td className="py-2 px-4">{cat.age} tahun</td>
                            <td className="py-2 px-4">{cat.gender}</td>
                            <td className="py-2 px-4">
                                <span
                                    className={`py-1 px-2 rounded-full ${cat.vaccinationStatus === "vaccinated"
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                        } text-white`}
                                >
                                    {cat.vaccinationStatus === "vaccinated"
                                        ? "Tervaksinasi"
                                        : "Belum Vaksin"}
                                </span>
                            </td>
                            <td className="py-2 px-4">{cat.description}</td>
                            <td className="py-2 px-4 relative">
                                <FaEllipsisH
                                    className="cursor-pointer"
                                    onClick={() => handleDropdownToggle(index)}
                                />
                                {openDropdownIndex === index && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                            onClick={() => openModal("edit", cat._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                            onClick={() => openModal("delete", cat._id)}
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="mt-4 bg-black text-white py-2 px-4 rounded">Tambah Kucing Baru</button>
            <div className="flex justify-center mt-4">
                <button className="bg-[#000000] text-white py-2 px-4 rounded mr-2">Sebelumnya</button>
                <button className="bg-[#000000] text-white py-2 px-4 rounded">Berikutnya</button>
            </div>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h3 className="text-2xl font-bold mb-4">
                            {modalAction === "edit" ? "Edit Kucing" : "Hapus Kucing"}
                        </h3>

                        {modalAction === "edit" ? (
                            // Form untuk mengedit kucing
                            <div>
                                <label className="block mb-2">Nama Kucing</label>
                                <input
                                    type="text"
                                    value={editCatData.name}
                                    onChange={(e) => setEditCatData({ ...editCatData, name: e.target.value })}
                                    className="border px-2 py-1 w-full mb-4"
                                />

                                <label className="block mb-2">Jenis (Breed)</label>
                                <input
                                    type="text"
                                    value={editCatData.breed}
                                    onChange={(e) => setEditCatData({ ...editCatData, breed: e.target.value })}
                                    className="border px-2 py-1 w-full mb-4"
                                />

                                <label className="block mb-2">Umur</label>
                                <input
                                    type="number"
                                    value={editCatData.age}
                                    onChange={(e) => setEditCatData({ ...editCatData, age: e.target.value })}
                                    className="border px-2 py-1 w-full mb-4"
                                />

                                <label className="block mb-2">Jenis Kelamin</label>
                                <input
                                    type="text"
                                    value={editCatData.gender}
                                    onChange={(e) => setEditCatData({ ...editCatData, gender: e.target.value })}
                                    className="border px-2 py-1 w-full mb-4"
                                />

                                <label className="block mb-2">Status Vaksinasi</label>
                                <select
                                    value={editCatData.vaccinationStatus}
                                    onChange={(e) =>
                                        setEditCatData({ ...editCatData, vaccinationStatus: e.target.value })
                                    }
                                    className="border px-2 py-1 w-full mb-4"
                                >
                                    <option value="vaccinated">Tervaksinasi</option>
                                    <option value="not vaccinated">Belum Vaksin</option>
                                </select>

                                <label className="block mb-2">Deskripsi</label>
                                <textarea
                                    value={editCatData.description}
                                    onChange={(e) =>
                                        setEditCatData({ ...editCatData, description: e.target.value })
                                    }
                                    className="border px-2 py-1 w-full mb-4"
                                />
                            </div>
                        ) : (
                            <p className="mb-4">
                                Apakah Anda yakin ingin{" "}
                                {modalAction === "edit" ? "mengedit" : "menghapus"} kucing ini?
                            </p>
                        )}

                        <div className="flex justify-end">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                                onClick={closeModal}
                            >
                                Batal
                            </button>
                            <button
                                className={`${modalAction === "edit"
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : "bg-red-500 hover:bg-red-600"
                                    } text-white font-bold py-2 px-4 rounded`}
                                onClick={() => {
                                    if (modalAction === "edit") {
                                        handleEditCat(); // Panggil fungsi untuk menyimpan perubahan edit
                                    } else if (modalAction === "delete") {
                                        handleDeleteCat(selectedCatId!); // Panggil fungsi untuk menghapus kucing
                                    }
                                    closeModal();
                                }}
                            >
                                {modalAction === "edit" ? "Simpan Perubahan" : "Hapus"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default kelolaKucing;