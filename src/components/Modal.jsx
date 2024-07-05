import React, { useState } from "react";

const Modal = ({
  isEditing,
  newJournal,
  setNewJournal,
  addJournal,
  setIsModalOpen,
  setIsEditing,
  error,
  isLoading,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleAddJournal = async () => {
    setIsSaving(true);
    await addJournal();
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Edit Jurnal" : "Tambah Jurnal"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Tanggal:</label>
          <input
            type="date"
            className="p-2 border border-gray-300 rounded w-full"
            value={newJournal.date}
            onChange={(e) =>
              setNewJournal({ ...newJournal, date: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Kegiatan:</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-full"
            value={newJournal.activity}
            onChange={(e) =>
              setNewJournal({ ...newJournal, activity: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Catatan:</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-full"
            value={newJournal.notes}
            onChange={(e) =>
              setNewJournal({ ...newJournal, notes: e.target.value })
            }
          />
        </div>


        <div className="flex justify-end">
          <button
            onClick={() => {
              setIsModalOpen(false);
              setIsEditing(false);
              setNewJournal({ date: "", activity: "", notes: "" });
            }}
            className="bg-gray-500 text-white p-2 rounded mr-2 hover:bg-gray-600"
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            onClick={handleAddJournal}
            className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${
              isSaving || isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSaving || isLoading}
          >
            {isSaving || isLoading
              ? "Menyimpan..."
              : isEditing
              ? "Simpan Perubahan"
              : "Tambah Jurnal"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
