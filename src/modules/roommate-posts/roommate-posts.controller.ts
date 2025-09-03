import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoommatePostsService } from './roommate-posts.service';
import { CreateRoommatePostDto } from './dto/create-roommate-post.dto';
import { UpdateRoommatePostDto } from './dto/update-roommate-post.dto';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';

@Controller('roommate-posts')
export class RoommatePostsController {
  constructor(private readonly roommatePostsService: RoommatePostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  create(@Body() createRoommatePostDto: CreateRoommatePostDto) {
    return this.roommatePostsService.create(createRoommatePostDto);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.roommatePostsService.findByUserId(parseInt(userId));
    }
    return this.roommatePostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roommatePostsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateRoommatePostDto: UpdateRoommatePostDto) {
    return this.roommatePostsService.update(id, updateRoommatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    this.roommatePostsService.remove(id);
    return { message: 'Xóa bài đăng tìm bạn ở ghép thành công' };
  }
}
