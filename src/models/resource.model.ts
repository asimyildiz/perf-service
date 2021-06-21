import mongoose, { Schema } from 'mongoose';
import { IResource } from '../interfaces/resource.interface';

// creates a resource schema for mongoose using IResource interface
const ResourceSchema = new Schema<IResource>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  initiatorType: { type: String, required: true },
  decodedBodySize: { type: Number, required: true },
  encodedBodySize: { type: Number, required: true },
  transferSize: { type: Number, required: true },
  redirectTime: { type: Number, required: true },
  dnsLookupTime: { type: Number, required: true },
  tcpHandshakeTime: { type: Number, required: true },
  responseTime: { type: Number, required: true },
  secureConnectionTime: { type: Number, required: true },
  fetchUntilResponseEndTime: { type: Number, required: true },
  requestStartUntilResponseEndTime: { type: Number, required: true },
  startUntilResponseEndTime: { type: Number, required: true },
});

export default mongoose.model<IResource>('Resource', ResourceSchema);
