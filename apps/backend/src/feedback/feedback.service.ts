import { Injectable } from '@nestjs/common';
import { JiraService } from '../utils/jira.service';
import { Feedback } from './schemas/feedback.schema'; // assuming you have this schema already
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<Feedback>,
    private readonly jiraService: JiraService,
  ) {}

  async create(feedbackDto: any) {
    // Save the feedback to the database
    const feedback = new this.feedbackModel(feedbackDto);
    await feedback.save();

    // After saving feedback, create a Jira ticket
    await this.jiraService.createJiraTicket(feedbackDto);

    return feedback;
  }

  async findAll() {
    return this.feedbackModel.find().exec();
  }
}
