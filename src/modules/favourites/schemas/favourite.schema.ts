import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavouriteDocument = Favourite & Document;

@Schema({ timestamps: true, collection: 'favourites' })
export class Favourite {
  @Prop({ required: true, unique: true })
  favouriteId: number;

  @Prop({ required: true })
  userId: number;

  @Prop({ required: true, enum: ['rent', 'roommate'] })
  postType: string;

  @Prop({ required: true })
  postId: number;

  @Prop()
  createdAt: Date;
}

export const FavouriteSchema = SchemaFactory.createForClass(Favourite);
