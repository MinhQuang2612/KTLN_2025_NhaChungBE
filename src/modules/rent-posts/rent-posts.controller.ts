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
import { RentPostsService } from './rent-posts.service';
import { CreateRentPostDto } from './dto/create-rent-post.dto';
import { UpdateRentPostDto } from './dto/update-rent-post.dto';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';

@Controller('rent-posts')
export class RentPostsController {
  constructor(private readonly rentPostsService: RentPostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  create(@Body() createRentPostDto: CreateRentPostDto) {
    return this.rentPostsService.create(createRentPostDto);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.rentPostsService.findByUserId(parseInt(userId));
    }
    return this.rentPostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentPostsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateRentPostDto: UpdateRentPostDto) {
    return this.rentPostsService.update(id, updateRentPostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    this.rentPostsService.remove(id);
    return { message: 'Xóa bài đăng thuê phòng thành công' };
  }
}
