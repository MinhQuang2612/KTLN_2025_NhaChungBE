import { PartialType } from '@nestjs/mapped-types';
import { CreateRoommatePostDto } from './create-roommate-post.dto';

export class UpdateRoommatePostDto extends PartialType(CreateRoommatePostDto) {}
