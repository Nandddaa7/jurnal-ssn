"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Table from "../components/Table";
import LoadingTable from "@/components/LoadingTable";

const App = () => {
  const [journals, setJournals] = useState([]);
  const [newJournal, setNewJournal] = useState({
    date: "",
    activity: "",
    notes: "",
    CreatedAt: Date.now(),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [lodingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetch("/api/journal")
      .then((response) => response.json())
      .then((data) => {
        setJournals(data.journals);
        setLoadingData(false);
      });
  }, []);
  const addJournal = async () => {
    setError("");
    const method = isEditing ? "PUT" : "POST";
    const response = await fetch("/api/journals", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJournal),
    });

    const result = await response.json();
    if (result.status) {
      if (isEditing) {
        setJournals((prevJournals) =>
          prevJournals.map((journal) =>
            journal._id === newJournal._id ? newJournal : journal
          )
        );
      } else {
        const updatedJournals = [
          ...journals,
          { ...newJournal, _id: result.result.insertedId },
        ].sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));

        setJournals(updatedJournals);
      }
      setNewJournal({ date: "", activity: "", notes: "" });
      setIsModalOpen(false);
      setIsEditing(false);
    } else {
      setError(result.error);
    }
  };

  const editJournal = (journal) => {
    setNewJournal(journal);
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const deleteJournal = async (id) => {
    const response = await fetch("/api/journals", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setJournals((prevJournals) =>
        prevJournals.filter((journal) => journal._id !== id)
      );
    }
  };

  return (
    <div className="py-16 px-6 bg-gray-100 min-h-screen">
      <Header setIsModalOpen={setIsModalOpen} />
      {isModalOpen && (
        <Modal
          isEditing={isEditing}
          newJournal={newJournal}
          setNewJournal={setNewJournal}
          addJournal={addJournal}
          setIsModalOpen={setIsModalOpen}
          setIsEditing={setIsEditing}
          error={error}
        />
      )}
      {!lodingData ? (
        <Table
          journals={journals}
          editJournal={editJournal}
          deleteJournal={deleteJournal}
        />
      ) : (
        <LoadingTable />
      )}
    </div>
  );
};

export default App;
