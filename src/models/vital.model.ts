import mongoose, { Schema } from 'mongoose';
import { IVital } from '../interfaces/vital.interface';

// creates a web vitals schema for mongoose using IVital interface
const VitalSchema = new Schema<IVital>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  delta: { type: Number, required: true },
  value: { type: Number, required: true },
});

export default mongoose.model<IVital>('Vital', VitalSchema);
