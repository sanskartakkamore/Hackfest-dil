import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  getProjectConfig(projectId: string) {
    return {
      emailNotifications: true,
      jiraIntegration: true,
    };
  }
}
