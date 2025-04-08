import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Project extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: {} })
  config: {
    sendEmailNotification: boolean;
    emailRecipients?: string[];
    createJiraTicket: boolean;
    jiraConfig?: {
      jiraUrl: string;
      apiKey: string;
      projectKey: string;
      issueType: string;
    };
  };
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
