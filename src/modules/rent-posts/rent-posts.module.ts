import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RentPostsService } from './rent-posts.service';
import { RentPostsController } from './rent-posts.controller';
import { RentPost, RentPostSchema } from './schemas/rent-post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RentPost.name, schema: RentPostSchema }]),
  ],
  controllers: [RentPostsController],
  providers: [RentPostsService],
  exports: [RentPostsService],
})
export class RentPostsModule {}
