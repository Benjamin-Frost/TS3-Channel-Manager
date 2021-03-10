import mongoose, { Document, Schema } from 'mongoose';

export interface IChannel extends Document {
  channelId: number;
  channelNum: number;
  channelName: string;
  ownerUid: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChannelSchema = new Schema(
  {
    // The Channel ID asigned by Teamspeak Server
    channelId: { type: Number, required: true },
    // The calculated Channel Number (Defining Order + Name)
    channelNum: { type: Number, required: true },
    channelName: { type: String, required: true },
    ownerUid: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IChannel>('Channel', ChannelSchema);
