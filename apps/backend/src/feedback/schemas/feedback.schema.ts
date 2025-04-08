import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class DeviceInfo {
  @Prop({ required: false }) os?: string;
  @Prop({ required: false }) browser?: string;
  @Prop({ required: false }) deviceType?: string;
  @Prop({ required: false }) screenResolution?: string;
  @Prop({ required: false }) userAgent?: string;
}
export const DeviceInfoSchema = SchemaFactory.createForClass(DeviceInfo);

@Schema()
export class Feedback extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ type: DeviceInfoSchema, required: false })
  deviceInfo?: DeviceInfo;

  @Prop({ type: [String], required: false })
  stepsToReproduce?: string[];

  @Prop({ required: false, enum: ['low', 'medium', 'high', 'critical'] })
  severity?: 'low' | 'medium' | 'high' | 'critical';

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
