import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackModule } from './feedback/feedback.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@dili-hackfest.no62crh.mongodb.net/UserFormData',
    ),
    FeedbackModule,
    ConfigModule,
  ],
})
export class AppModule {}
