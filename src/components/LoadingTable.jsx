"use client"

import { useState, useEffect } from "react";

const LoadingTable = () => {
  const [titik, setTitik] = useState("...");

  useEffect(() => {
    const interval = setInterval(() => {
      setTitik((prevTitik) => (prevTitik.length < 5 ? prevTitik + "." : ""));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-6">
      Fetching Data{titik}
    </div>
  );
};

export default LoadingTable;
