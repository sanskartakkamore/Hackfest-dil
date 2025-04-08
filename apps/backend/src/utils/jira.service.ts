import { Injectable } from '@nestjs/common';

@Injectable()
export class JiraService {
  createJiraTicket(projectId: string, issueType: string, description: string) {
    console.log(
      `JIRA Ticket Created in ${projectId}: ${issueType} - ${description}`,
    );
  }
}
