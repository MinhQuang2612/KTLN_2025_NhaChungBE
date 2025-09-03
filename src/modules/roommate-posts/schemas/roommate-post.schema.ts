import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoommatePostDocument = RoommatePost & Document;

@Schema({ _id: false })
export class CurrentRoom {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  area: number;

  @Prop({ required: true })
  description: string;
}

@Schema({ _id: false })
export class PersonalInfo {
  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  occupation: string;

  @Prop({ type: [String], default: [] })
  hobbies: string[];

  @Prop({ type: [String], default: [] })
  habits: string[];
}

@Schema({ _id: false })
export class Requirements {
  @Prop({ type: [Number], required: true })
  ageRange: number[];

  @Prop({ required: true })
  gender: string;

  @Prop({ type: [String], default: [] })
  traits: string[];

  @Prop({ required: true })
  maxPrice: number;
}

@Schema({ timestamps: true, collection: 'roommateposts' })
export class RoommatePost {
  @Prop({ required: true, unique: true })
  roommatePostId: number;

  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: CurrentRoom, required: true })
  currentRoom: CurrentRoom;

  @Prop({ type: PersonalInfo, required: true })
  personalInfo: PersonalInfo;

  @Prop({ type: Requirements, required: true })
  requirements: Requirements;

  @Prop({ default: 'active' })
  status: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const RoommatePostSchema = SchemaFactory.createForClass(RoommatePost);
