import React from "react";
import { Button } from "@/components/ui/button"


const ConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Konfirmasi Hapus</h2>
        <p className=" mb-4">Anda yakin ingin menghapus jurnal ini?</p>
        <div className="flex justify-end space-x-2">
          <Button variant="outline"
            onClick={onCancel}
           
          >
            Batal
          </Button>
          <Button variant="destructive"
            onClick={onConfirm}
        
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
