import React from 'react';

const kelolaKucing = () => {
    return (

        <div className="p-8 bg-white">
            <div className="flex items-center mb-8">
                <div className="absolute top-4 left-4 flex items-center ml-10 mt-10">
                    <img src="./assets/images/logo-kucing.png" alt="Kucing PAW Logo" className=" mr-[1.7vw] h-[71px]" />
                    <span className="text-lg text-black font-bold text-[32px]" style={{ fontFamily: 'Jetbrains Mono' }}>Kucing PAW</span>
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Pengelolaan Kucing</h2>
            <div className="flex items-center mb-4">
                <div className="relative flex-grow">
                    <input type="text" placeholder="Cari Kucing" className="w-full border rounded-full py-2 px-4" />
                    <i className="fas fa-search absolute right-4 top-2.5 text-gray-500"></i>
                </div>
                <button className="ml-4 p-2 border rounded-full">
                    <i className="fas fa-filter"></i>
                </button>
                <button className="ml-4 p-2 border rounded-full">
                    Urutkan berdasarkan: Nama <i className="fas fa-times"></i>
                </button>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b">
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
                    {Array(5).fill().map((_, index) => (
                        <>
                            <tr className="border-b bg-gray-100">
                                <td className="py-2 px-4">01.</td>
                                <td className="py-2 px-4">Lewo</td>
                                <td className="py-2 px-4">Kucing Kampung</td>
                                <td className="py-2 px-4">6 tahun</td>
                                <td className="py-2 px-4">Jantan</td>
                                <td className="py-2 px-4">
                                    <span className="bg-green-500 text-white py-1 px-2 rounded-full">Tervaksinasi</span>
                                </td>
                                <td className="py-2 px-4">Kucing gemuk hobi tidur</td>
                                <td className="py-2 px-4 relative">
                                    <i className="fas fa-ellipsis-h cursor-pointer"></i>
                                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
                                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">Edit</button>
                                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">Hapus</button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b bg-white">
                                <td className="py-2 px-4">02.</td>
                                <td className="py-2 px-4">Ebi</td>
                                <td className="py-2 px-4">Sleman Longhair</td>
                                <td className="py-2 px-4">5 tahun</td>
                                <td className="py-2 px-4">Betina</td>
                                <td className="py-2 px-4">
                                    <span className="bg-red-500 text-white py-1 px-2 rounded-full">Belum Vaksin</span>
                                </td>
                                <td className="py-2 px-4">Teman main Lewo</td>
                                <td className="py-2 px-4 relative">
                                    <i className="fas fa-ellipsis-h cursor-pointer"></i>
                                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
                                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">Edit</button>
                                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">Hapus</button>
                                    </div>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
            <button className="mt-4 bg-black text-white py-2 px-4 rounded">Tambah Kucing Baru</button>
            <div className="flex justify-center mt-4">
                <button className="px-2">&larr;</button>
                <button className="px-2 bg-black text-white rounded-full">1</button>
                <button className="px-2">2</button>
                <button className="px-2">3</button>
                <button className="px-2">4</button>
                <button className="px-2">5</button>
                <button className="px-2">...</button>
                <button className="px-2">12</button>
                <button className="px-2">&rarr;</button>
            </div>
        </div>

    )
}

export default kelolaKucing;