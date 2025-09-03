import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoommatePost, RoommatePostDocument } from './schemas/roommate-post.schema';
import { CreateRoommatePostDto } from './dto/create-roommate-post.dto';
import { UpdateRoommatePostDto } from './dto/update-roommate-post.dto';

@Injectable()
export class RoommatePostsService {
  constructor(
    @InjectModel(RoommatePost.name) private roommatePostModel: Model<RoommatePostDocument>,
  ) {}

  async create(createRoommatePostDto: CreateRoommatePostDto): Promise<RoommatePost> {
    const nextRoommatePostId = await this.getNextRoommatePostId();
    
    const createdRoommatePost = new this.roommatePostModel({
      ...createRoommatePostDto,
      userId: parseInt(createRoommatePostDto.userId),
      roommatePostId: nextRoommatePostId,
    });

    return createdRoommatePost.save();
  }

  async findAll(): Promise<RoommatePost[]> {
    return this.roommatePostModel.find().exec();
  }

  async findOne(id: string): Promise<RoommatePost> {
    const roommatePost = await this.roommatePostModel.findOne({ roommatePostId: parseInt(id) }).exec();
    if (!roommatePost) {
      throw new NotFoundException('Không tìm thấy bài đăng tìm bạn ở ghép');
    }
    return roommatePost;
  }

  async findByUserId(userId: number): Promise<RoommatePost[]> {
    return this.roommatePostModel.find({ userId }).exec();
  }

  async update(id: string, updateRoommatePostDto: UpdateRoommatePostDto): Promise<RoommatePost> {
    const updatedRoommatePost = await this.roommatePostModel
      .findOneAndUpdate(
        { roommatePostId: parseInt(id) },
        updateRoommatePostDto,
        { new: true }
      )
      .exec();

    if (!updatedRoommatePost) {
      throw new NotFoundException('Không tìm thấy bài đăng tìm bạn ở ghép');
    }

    return updatedRoommatePost;
  }

  async remove(id: string): Promise<void> {
    const result = await this.roommatePostModel.deleteOne({ roommatePostId: parseInt(id) }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Không tìm thấy bài đăng tìm bạn ở ghép');
    }
  }

  private async getNextRoommatePostId(): Promise<number> {
    const lastRoommatePost = await this.roommatePostModel.findOne().sort({ roommatePostId: -1 }).exec();
    return lastRoommatePost ? lastRoommatePost.roommatePostId + 1 : 1;
  }
}
