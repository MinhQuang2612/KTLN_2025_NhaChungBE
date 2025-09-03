import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentPost, RentPostDocument } from './schemas/rent-post.schema';
import { CreateRentPostDto } from './dto/create-rent-post.dto';
import { UpdateRentPostDto } from './dto/update-rent-post.dto';

@Injectable()
export class RentPostsService {
  constructor(
    @InjectModel(RentPost.name) private rentPostModel: Model<RentPostDocument>,
  ) {}

  async create(createRentPostDto: CreateRentPostDto): Promise<RentPost> {
    const nextRentPostId = await this.getNextRentPostId();
    
    const createdRentPost = new this.rentPostModel({
      ...createRentPostDto,
      userId: parseInt(createRentPostDto.userId),
      rentPostId: nextRentPostId,
    });

    return createdRentPost.save();
  }

  async findAll(): Promise<RentPost[]> {
    return this.rentPostModel.find().exec();
  }

  async findOne(id: string): Promise<RentPost> {
    const rentPost = await this.rentPostModel.findOne({ rentPostId: parseInt(id) }).exec();
    if (!rentPost) {
      throw new NotFoundException('Không tìm thấy bài đăng thuê phòng');
    }
    return rentPost;
  }

  async findByUserId(userId: number): Promise<RentPost[]> {
    return this.rentPostModel.find({ userId }).exec();
  }

  async update(id: string, updateRentPostDto: UpdateRentPostDto): Promise<RentPost> {
    const updatedRentPost = await this.rentPostModel
      .findOneAndUpdate(
        { rentPostId: parseInt(id) },
        updateRentPostDto,
        { new: true }
      )
      .exec();

    if (!updatedRentPost) {
      throw new NotFoundException('Không tìm thấy bài đăng thuê phòng');
    }

    return updatedRentPost;
  }

  async remove(id: string): Promise<void> {
    const result = await this.rentPostModel.deleteOne({ rentPostId: parseInt(id) }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Không tìm thấy bài đăng thuê phòng');
    }
  }

  private async getNextRentPostId(): Promise<number> {
    const lastRentPost = await this.rentPostModel.findOne().sort({ rentPostId: -1 }).exec();
    return lastRentPost ? lastRentPost.rentPostId + 1 : 1;
  }
}
