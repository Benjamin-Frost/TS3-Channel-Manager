export default interface IChannel {
  _id: string;
  channelId: number;
  channelNum: number;
  channelName: string;
  ownerUid: string;
  createdAt: Date;
  updatedAt: Date;
}
