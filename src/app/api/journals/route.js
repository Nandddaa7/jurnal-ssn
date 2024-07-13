// pages/api/journals.js

import clientPromise from "../../../lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("jurnal-pkl");

    const journals = await db.collection("journals")
      .find({})
      .sort({ CreatedAt: -1 }) 
      .toArray();

    return NextResponse.json({ status: true, journals });
  } catch (error) {
    return NextResponse.error(new Error("Failed to fetch journals"));
  }
}

export async function POST(request) {
  try {
    const { date, activity, notes } = await request.json();

    if (!date || !activity) {
      return NextResponse.json({
        status: false,
        error: "Tanggal dan Kegiatan harus diisi!",
      });
    }

    const client = await clientPromise;
    const db = client.db("jurnal-pkl");

    const existingJournal = await db.collection("journals").findOne({ date });
    if (existingJournal) {
      return NextResponse.json({
        status: false,
        error: "Jurnal dengan tanggal ini sudah ada dalam database",
      });
    }

    const newJournal = { date, activity, notes, CreatedAt: Date.now() };
    console.log(newJournal);

    const result = await db.collection("journals").insertOne(newJournal);
    return NextResponse.json({ status: true, result });
  } catch (error) {
    return NextResponse.json({
      status: false,
      error: "Gagal menambah data Jurnal",
    });
  }
}

export async function PUT(request) {
  try {
    const { _id, date, activity, ...updateData } = await request.json();

    if (!date || !activity) {
      return NextResponse.json({
        status: false,
        error: "Tanggal dan Kegiatan harus diisi!",
      });
    }

    updateData.date = date;
    updateData.activity = activity;
    updateData.lastEdit = Date.now();

    const client = await clientPromise;
    const db = client.db("jurnal-pkl");

    const existingJournal = await db
      .collection("journals")
      .findOne({ _id: new ObjectId(_id) });
    if (!existingJournal) {
      return NextResponse.json({
        status: false,
        error: "Jurnal tidak ditemukan",
      });
    }

    const result = await db
      .collection("journals")
      .updateOne({ _id: new ObjectId(_id) }, { $set: updateData });

    return NextResponse.json({ status: true, result });
  } catch (error) {
    return NextResponse.json({
      status: false,
      error: "Gagal memperbarui data Jurnal",
    });
  }
}


export async function DELETE(request) {
  try {
    const { id } = await request.json();

    // Hapus data dari MongoDB
    const client = await clientPromise;
    const db = client.db("jurnal-pkl");
    const result = await db
      .collection("journals")
      .deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ status: true, result });
  } catch (error) {
    return NextResponse.json({
      status: false,
      error: "Gagal menghapus Jurnal",
    });
  }
}
