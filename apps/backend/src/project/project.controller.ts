import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';

@Controller('projects')
export class ProjectController {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  @Post()
  async createProject(@Body() projectDto: any) {
    return await new this.projectModel(projectDto).save();
  }

  @Get(':id')
  async getProject(@Param('id') id: string) {
    return await this.projectModel.findById(id);
  }
}
