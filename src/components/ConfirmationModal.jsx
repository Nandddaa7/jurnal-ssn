import React from "react";

const ConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Konfirmasi Hapus</h2>
        <p className="text-gray-700 mb-4">Anda yakin ingin menghapus jurnal ini?</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white p-2 rounded mr-2 hover:bg-gray-600"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
