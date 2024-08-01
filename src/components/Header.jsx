import React from "react";
import ToggleDarkMode from "./ToggleDarkMode";
import { Button } from "@/components/ui/button"

const Header = ({ setIsModalOpen }) => {
  return (
    <div className="fixed top-0 left-0 right-0  shadow-md z-10 py-2 px-4 md:px-36 flex justify-between items-center backdrop-blur-sm  dark:shadow-gray-200/20">
      <h1 className="text-2xl font-bold">Jurnal PKL</h1>
      <div className=" flex space-x-4 items-center">
        <Button
          onClick={() => setIsModalOpen(true)}
          className=""
        >
          Tambah Jurnal
        </Button>
        <ToggleDarkMode />
      </div>
    </div>
  );
};

export default Header;
