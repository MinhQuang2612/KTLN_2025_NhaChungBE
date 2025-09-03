import { PartialType } from '@nestjs/mapped-types';
import { CreateRentPostDto } from './create-rent-post.dto';

export class UpdateRentPostDto extends PartialType(CreateRentPostDto) {}
