import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  registrationLink: { type: String, required: true },
  requirements: { type: String },
  whatsappLink:{type: String},
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;
