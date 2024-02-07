import { Body, Controller, Get, Post, Delete, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entities/user.entity';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) { }

  }
