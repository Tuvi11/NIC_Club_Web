import Leader from "../models/leader.model.js";
import fs from "fs";

export const getLeaders = async (req, res) => {
  const leaders = await Leader.find();
  res.json(leaders);
};

export const addOrUpdateLeader = async (req, res) => {
  const { role, name } = req.body;
  const photo = req.file.filename;

  if (!photo) return res.status(400).json({ message: "Photo required" });

  const existing = await Leader.findOne({ role });
  if (existing) {
    // Remove old photo
    fs.unlink(existing.photo, () => {});
    existing.name = name;
    existing.photo = photo;
    await existing.save();
    return res.json(existing);
  }

  const newLeader = new Leader({ role, name, photo });
  await newLeader.save();
  res.json(newLeader);
};

export const deleteLeader = async (req, res) => {
  const { role } = req.params;
  const leader = await Leader.findOneAndDelete({ role });
  if (leader) fs.unlink(leader.photo, () => {});
  res.json({ message: "Deleted" });
};
