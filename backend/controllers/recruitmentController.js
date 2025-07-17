import ClubRecruitment from '../models/clubRecruitment.js';
import DSARecruitment from '../models/DSARecruitment.js';

// Club Recruitment
export const getClubRecruitment = async (req, res) => {
  const data = await ClubRecruitment.findOne();
  res.json(data);
};

export const updateClubRecruitment = async (req, res) => {
  const updated = await ClubRecruitment.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(updated);
};

export const uploadTask = async (req, res) => {
  const { file } = req;
  const fileType = file?.mimetype.includes('image') ? 'image' : 'file';

  const updated = await ClubRecruitment.findOneAndUpdate(
    {},
    {
      $push: {
        'task.uploads': {
          fileUrl: `/uploads/${file.filename}`,
          fileType
        }
      }
    },
    { new: true, upsert: true }
  );
  res.json(updated);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const updated = await ClubRecruitment.findOneAndUpdate(
    {},
    { $pull: { 'task.uploads': { _id: id } } },
    { new: true }
  );
  res.json(updated);
};

// DSA Recruitment
export const getDSARecruitment = async (req, res) => {
  const data = await DSARecruitment.findOne();
  res.json(data);
};

export const updateDSARecruitment = async (req, res) => {
  const updated = await DSARecruitment.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(updated);
};

