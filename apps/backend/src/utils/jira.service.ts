import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JiraService {
  private readonly jiraUrl = ''; 
  private readonly email = '';
  private readonly apiToken = ''; 

  private auth = {
    username: this.email,
    password: this.apiToken,
  };

  // Function to create Jira ticket
  async createJiraTicket(data: any) {
    try {
      // Construct the payload for creating a Jira ticket
      const issueData = {
        fields: {
          project: {
            key: 'DFA', // The project key where the issue will be created
          },
          summary: 'Feedback from user', // The summary of the issue
          description: data.message, // The description of the issue
          issuetype: {
            name: 'Task', // The type of the issue (e.g., Bug, Task)
          },
        },
      };

      // Make a request to create the issue
      const response = await axios.post(
        `${this.jiraUrl}/rest/api/2/issue`,
        issueData,
        {
          auth: this.auth,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // Once the issue is created, add a comment with the creator's name and email
      const issueKey = response.data.key;
      await this.addComment(issueKey, data.name, data.email);

      console.log(`Jira ticket created successfully: ${issueKey}`);
      return response.data;
    } catch (error) {
      console.error(
        'Error creating Jira ticket:',
        error.response ? error.response.data : error.message,
      );
      throw new Error('Failed to create Jira ticket');
    }
  }

  // Function to add a comment to the Jira ticket
  async addComment(
    issueKey: string,
    creatorName: string,
    creatorEmail: string,
  ) {
    try {
      const commentData = {
        body: `Ticket created by: ${creatorName}, Email: ${creatorEmail}`,
      };

      // Post the comment to the Jira ticket
      await axios.post(
        `${this.jiraUrl}/rest/api/2/issue/${issueKey}/comment`,
        commentData,
        {
          auth: this.auth,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Comment added successfully');
    } catch (error) {
      console.error(
        'Error adding comment to Jira ticket:',
        error.response ? error.response.data : error.message,
      );
    }
  }
}
