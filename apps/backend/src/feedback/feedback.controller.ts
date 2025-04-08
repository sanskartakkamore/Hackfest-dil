import { Controller, Post, Get, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async create(@Body() feedbackDto: any) {
    return this.feedbackService.create(feedbackDto);
  }

  @Get()
  async findAll() {
    return this.feedbackService.findAll();
  }
}
