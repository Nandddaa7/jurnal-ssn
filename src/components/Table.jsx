import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import idLocale from "date-fns/locale/id";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmationModal from "./ConfirmationModal";

const DataTable = ({ journals, editJournal, deleteJournal }) => {
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
      <Table className="min-w-full  shadow-md rounded mt-6 text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="py-2 px-4 border-b border-gray-200 dark:border-gray-800 text-center">No</TableHead>
            <TableHead className="py-2 px-4 border-b border-gray-200 dark:border-gray-800 text-center">Hari</TableHead>
            <TableHead
              className="py-2 px-4 border-b border-gray-200 dark:border-gray-800 text-center cursor-pointer"
              onClick={() => handleSort("date")}
            >
              Tanggal
            </TableHead>
            <TableHead className="py-2 px-4 border-b border-gray-200 dark:border-gray-800 text-center">Kegiatan</TableHead>
            <TableHead className="py-2 px-4 border-b border-gray-200 dark:border-gray-800 text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedJournals.map((journal, index) => (
            <TableRow key={journal._id}>
              <TableCell className="py-2 px-4 border-b border-gray-200 dark:border-gray-800  text-center">
                {index + 1}
              </TableCell>
              <TableCell className="py-2 px-4 border-b border-gray-200 dark:border-gray-800 text-center">
                {format(parseISO(journal.date), "EEEE", { locale: idLocale })}
              </TableCell>
              <TableCell className="py-2 px-4 border-b border-gray-200 dark:border-gray-800 text-center whitespace-nowrap">
                {format(parseISO(journal.date), "dd MMMM yyyy", { locale: idLocale })}
              </TableCell>
              <TableCell className="py-2 px-4 border-b border-gray-200 dark:border-gray-800 text-center min-w-96">
                {journal.activity}
              </TableCell>
              <TableCell className="py-2 px-4 border-b border-gray-200 dark:border-gray-800 text-center flex justify-around space-x-3">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmationModal
        isOpen={showConfirmation}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default DataTable;
