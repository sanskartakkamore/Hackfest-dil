import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  sendEmail(recipient: string, subject: string, message: string) {
    console.log(`Email sent to ${recipient}: ${subject} - ${message}`);
  }
}
