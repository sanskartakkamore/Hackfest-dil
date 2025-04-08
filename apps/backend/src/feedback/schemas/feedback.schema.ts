import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class DeviceInfo {
  @Prop({ required: false })
  os?: string;

  @Prop({ required: false })
  browser?: string;

  @Prop({ required: false })
  deviceType?: string;

  @Prop({ required: false })
  screenResolution?: string;

  @Prop({ required: false })
  userAgent?: string;
}
export const DeviceInfoSchema = SchemaFactory.createForClass(DeviceInfo);

@Schema()
export class Feedback extends Document {
  @Prop({ required: true, enum: ['bug', 'suggestion', 'feature', 'other'] })
  feedbackType: 'bug' | 'suggestion' | 'feature' | 'other';

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  project: string;

  @Prop({ type: DeviceInfoSchema, required: false })
  deviceInfo?: DeviceInfo;

  @Prop({ type: [String], required: false })
  stepsToReproduce?: string[];

  @Prop({ enum: ['low', 'medium', 'high', 'critical', ''], required: false })
  severity?: 'low' | 'medium' | 'high' | 'critical' | '';

  @Prop({ default: Date.now })
  createdAt: Date;

  // Optional additional properties to match the Zod schema
  @Prop({ required: false })
  featureDescription?: string;

  @Prop({ required: false })
  useCase?: string;

  @Prop({ required: false })
  benefits?: string;

  @Prop({ required: false })
  priority?: string;

  @Prop({ required: false })
  similarFeature?: string;

  @Prop({ required: false })
  suggestionDescription?: string;

  @Prop({ required: false })
  rationale?: string;

  @Prop({ required: false })
  potentialImpact?: string;

  @Prop({ required: false })
  relatedIdea?: string;

  @Prop({ required: false })
  suggestionType?: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
