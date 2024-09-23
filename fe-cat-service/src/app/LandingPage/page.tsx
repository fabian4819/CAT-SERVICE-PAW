import React from 'react';
import Link from "next/link";
import { links } from "@/configs/dir";

const page = () => {
    return (
        <div style={{
            backgroundImage: 'url("/assets/images/background-cat.png")',
            backgroundSize: 'cover',       // Ensures the image covers the entire background
            backgroundRepeat: 'no-repeat', // Prevents image repetition
            backgroundPosition: 'center',  // Centers the image
        }}>

        <div className="flex items-center justify-center h-screen bg-black bg-opacity-50 text-white" >
        <div className="absolute top-4 left-4 flex items-center ml-10 mt-10">
            <img src="./assets/images/logo-kucing.png" alt="Kucing PAW Logo" className=" mr-[1.7vw] h-[71px]"/>
            <span className="text-lg font-bold text-[32px]" style={{fontFamily: 'Jetbrains Mono'}}>Kucing PAW</span>
        </div>
        <div className="text-center" style={{fontFamily: 'Jetbrains Mono'}}>
            <h1 className="text-4xl font-bold mb-4">Silahkan pilih layanan</h1>
            <h2 className="text-4xl font-bold mb-8">Kucing PAW Pet Adoption Center</h2>
            <div className="flex items-center justify-center space-x-10 text-[#1E1E1E] font-bold text-xl">
                <Link href={links.KelolaKucing}>
                <div className="flex flex-col items-center">
                    <button>
                    <img src='/assets/images/icon-kelolakucing.png' className="w-[137px] h-[137px] relative"></img>
                    </button>
                    <button className="bg-white  px-[0.52vw] py-[0.78vw] mt-10">Kelola Kucing</button>
                </div>
                </Link>
                <div className="flex flex-col items-center">
                    <button>

                    <img src='/assets/images/icon-adopsikucing.png' className="w-[137px] h-[137px] relative"></img>
                    </button>
                    <button className="bg-white  px-[0.52vw] py-[0.78vw] mt-10">Adopsi Kucing</button>
                </div>
                <div className="flex flex-col items-center">
                    <button>

                    <img src='/assets/images/icon-manjakankucing.png' className="w-[137px] h-[137px] relative"></img>
                    </button>
                    <button className="bg-white px-[0.52vw] py-[0.78vw] mt-10">Manjakan Kucing</button>
                </div>
            </div>
        </div>
    </div>
        </div>
    )
}

export default page;