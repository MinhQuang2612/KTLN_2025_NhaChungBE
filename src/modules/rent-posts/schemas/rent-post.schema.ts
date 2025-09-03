import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RentPostDocument = RentPost & Document;

@Schema({ _id: false })
export class Address {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  ward: string;

  @Prop({ required: true })
  district: string;

  @Prop({ required: true })
  city: string;
}

@Schema({ timestamps: true, collection: 'rentposts' })
export class RentPost {
  @Prop({ required: true, unique: true })
  rentPostId: number;

  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: Address, required: true })
  address: Address;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  area: number;

  @Prop({ required: true })
  category: string;

  @Prop({ type: [String], default: [] })
  furniture: string[];

  @Prop({ type: [String], default: [] })
  utilities: string[];

  @Prop({ default: 'active' })
  status: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const RentPostSchema = SchemaFactory.createForClass(RentPost);
