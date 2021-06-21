import mongoose, { Schema } from 'mongoose';
import { IDevice } from '../interfaces/device.interface';

// creates a device schema for mongoose using IDevice interface
const DeviceSchema = new Schema<IDevice>(
  {
    id: { type: String, required: true },
    connection: { type: Schema.Types.Mixed, required: true },
    cpus: { type: Number },
    memory: { type: Number },
    referrer: { type: String },
    url: { type: String, required: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IDevice>('Device', DeviceSchema);
