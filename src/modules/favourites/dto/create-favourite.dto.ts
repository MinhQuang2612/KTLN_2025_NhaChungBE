import { IsNotEmpty, IsNumberString, IsIn } from 'class-validator';

export class CreateFavouriteDto {
  @IsNotEmpty({ message: 'User ID không được để trống' })
  @IsNumberString({}, { message: 'User ID phải là số' })
  userId: string;

  @IsNotEmpty({ message: 'Loại bài đăng không được để trống' })
  @IsIn(['rent', 'roommate'], { message: 'Loại bài đăng phải là rent hoặc roommate' })
  postType: string;

  @IsNotEmpty({ message: 'ID bài đăng không được để trống' })
  @IsNumberString({}, { message: 'ID bài đăng phải là số' })
  postId: string;
}
