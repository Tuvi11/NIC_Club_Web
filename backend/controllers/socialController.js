import Social from '../models/Social.js';

export const addSocial = async (req, res) => {
  try {
    const newSocial = new Social(req.body);
    await newSocial.save();
    res.status(201).json(newSocial);
  } catch (err) {
    res.status(500).json({ message: 'Error adding social link', error: err });
  }
};

export const getSocials = async (req, res) => {
  try {
    const socials = await Social.find();
    res.status(200).json(socials);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching socials', error: err });
  }
};

export const deleteSocial = async (req, res) => {
  try {
    await Social.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Social deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting social', error: err });
  }
};
