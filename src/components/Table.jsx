import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import idLocale from "date-fns/locale/id";
import ConfirmationModal from "./ConfirmationModal";

const Table = ({ journals, editJournal, deleteJournal }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [journalToDelete, setJournalToDelete] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("index");

  const openConfirmation = (journal) => {
    setJournalToDelete(journal);
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setJournalToDelete(null);
    setShowConfirmation(false);
  };

  const confirmDelete = () => {
    if (journalToDelete) {
      deleteJournal(journalToDelete._id);
      setJournalToDelete(null);
      setShowConfirmation(false);
    }
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const sortedJournals = [...journals].sort((a, b) => {
    if (sortBy === "index") {
      return sortOrder === "asc" ? a.index - b.index : b.index - a.index;
    } else if (sortBy === "date") {
      const dateA = parseISO(a.date);
      const dateB = parseISO(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded mt-6 text-center ">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">No</th>
            <th className="py-2 px-4 border-b border-gray-200">Hari</th>
            <th
              className="py-2 px-4 border-b border-gray-200 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              Tanggal
            </th>
            <th className="py-2 px-4 border-b border-gray-200">Kegiatan</th>
            {/* <th className="py-2 px-4 border-b border-gray-200">Catatan</th> */}
            <th className="py-2 px-4 border-b border-gray-200">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sortedJournals.map((journal, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-gray-200 text-center">
                {index + 1}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {format(parseISO(journal.date), "EEEE", {
                  locale: idLocale,
                })}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 whitespace-nowrap">
                {format(parseISO(journal.date), "dd MMMM yyyy", {
                  locale: idLocale,
                })}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 min-w-60">
                {journal.activity}
              </td>
              {/* <td className="py-2 px-4 border-b border-gray-200">
                {journal.notes}
              </td> */}
              <td className="py-2 px-4 border-b border-gray-200 flex justify-around space-x-3">
                <button
                  onClick={() => editJournal(journal)}
                  className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => openConfirmation(journal)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationModal
        isOpen={showConfirmation}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Table;
