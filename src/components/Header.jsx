import React from 'react';

const Header = ({ setIsModalOpen }) => {
    return (
        <div className="fixed top-0 left-0 right-0  shadow-md z-10 py-2 px-4 md:px-36 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Jurnal PKL</h1>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Tambah Jurnal
            </button>
        </div>
    );
};

export default Header;
