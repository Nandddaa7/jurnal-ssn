import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastEdit: {
    type: Date,
  },
});

const Journal =
  mongoose.models.Journal || mongoose.model("Journal", journalSchema);

export default Journal;
