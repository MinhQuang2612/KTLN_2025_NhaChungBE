import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoommatePostsService } from './roommate-posts.service';
import { RoommatePostsController } from './roommate-posts.controller';
import { RoommatePost, RoommatePostSchema } from './schemas/roommate-post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RoommatePost.name, schema: RoommatePostSchema }]),
  ],
  controllers: [RoommatePostsController],
  providers: [RoommatePostsService],
  exports: [RoommatePostsService],
})
export class RoommatePostsModule {}
