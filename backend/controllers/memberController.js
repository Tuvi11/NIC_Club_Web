import Member from '../models/Member.js';

export const addMember = async (req, res) => {
  try {
    const { name, team, year, branch, linkedin, github } = req.body;
    const photo = req.file ? req.file.filename : '';

    const newMember = new Member({
      name,
      team: team.toLowerCase(),
      year,
      branch,
      linkedin,
      github,
      photo,
    });

    await newMember.save();
    res.status(201).json({ message: 'Member added successfully' });
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch members' });
  }
};

export const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
};

export const getMembers = async (req, res) => {
  try {
    const { team } = req.query;
    let members;

    if (team) {
      members = await Member.find({ team }); 
    } else {
      members = await Member.find(); 
    }

    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch members' });
  }
};