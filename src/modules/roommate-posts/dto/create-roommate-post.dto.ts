import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional, IsIn, ValidateNested, Min, Max, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCurrentRoomDto {
  @IsNotEmpty({ message: 'Địa chỉ phòng hiện tại không được để trống' })
  @IsString({ message: 'Địa chỉ phòng hiện tại phải là chuỗi' })
  address: string;

  @IsNotEmpty({ message: 'Giá phòng không được để trống' })
  @IsNumber({}, { message: 'Giá phòng phải là số' })
  price: number;

  @IsNotEmpty({ message: 'Diện tích phòng không được để trống' })
  @IsNumber({}, { message: 'Diện tích phòng phải là số' })
  area: number;

  @IsNotEmpty({ message: 'Mô tả phòng không được để trống' })
  @IsString({ message: 'Mô tả phòng phải là chuỗi' })
  description: string;
}

export class CreatePersonalInfoDto {
  @IsNotEmpty({ message: 'Tuổi không được để trống' })
  @IsNumber({}, { message: 'Tuổi phải là số' })
  @Min(18, { message: 'Tuổi phải từ 18 trở lên' })
  @Max(100, { message: 'Tuổi không được quá 100' })
  age: number;

  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  @IsIn(['male', 'female'], { message: 'Giới tính phải là male hoặc female' })
  gender: string;

  @IsNotEmpty({ message: 'Nghề nghiệp không được để trống' })
  @IsString({ message: 'Nghề nghiệp phải là chuỗi' })
  occupation: string;

  @IsOptional()
  @IsArray({ message: 'Sở thích phải là mảng' })
  @IsString({ each: true, message: 'Mỗi sở thích phải là chuỗi' })
  hobbies?: string[];

  @IsOptional()
  @IsArray({ message: 'Thói quen phải là mảng' })
  @IsString({ each: true, message: 'Mỗi thói quen phải là chuỗi' })
  habits?: string[];
}

export class CreateRequirementsDto {
  @IsNotEmpty({ message: 'Khoảng tuổi không được để trống' })
  @IsArray({ message: 'Khoảng tuổi phải là mảng' })
  @IsNumber({}, { each: true, message: 'Mỗi tuổi phải là số' })
  @Min(18, { each: true, message: 'Tuổi tối thiểu là 18' })
  @Max(100, { each: true, message: 'Tuổi tối đa là 100' })
  ageRange: number[];

  @IsNotEmpty({ message: 'Giới tính yêu cầu không được để trống' })
  @IsIn(['male', 'female', 'any'], { message: 'Giới tính yêu cầu phải là male, female hoặc any' })
  gender: string;

  @IsOptional()
  @IsArray({ message: 'Tính cách phải là mảng' })
  @IsString({ each: true, message: 'Mỗi tính cách phải là chuỗi' })
  traits?: string[];

  @IsNotEmpty({ message: 'Giá tối đa không được để trống' })
  @IsNumber({}, { message: 'Giá tối đa phải là số' })
  @Min(0, { message: 'Giá tối đa phải lớn hơn 0' })
  maxPrice: number;
}

export class CreateRoommatePostDto {
  @IsNotEmpty({ message: 'User ID không được để trống' })
  @IsNumberString({}, { message: 'User ID phải là số' })
  userId: string;

  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  @IsString({ message: 'Tiêu đề phải là chuỗi' })
  title: string;

  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  @IsString({ message: 'Mô tả phải là chuỗi' })
  description: string;

  @IsOptional()
  @IsArray({ message: 'Hình ảnh phải là mảng' })
  @IsString({ each: true, message: 'Mỗi hình ảnh phải là chuỗi' })
  images?: string[];

  @IsNotEmpty({ message: 'Thông tin phòng hiện tại không được để trống' })
  @ValidateNested()
  @Type(() => CreateCurrentRoomDto)
  currentRoom: CreateCurrentRoomDto;

  @IsNotEmpty({ message: 'Thông tin cá nhân không được để trống' })
  @ValidateNested()
  @Type(() => CreatePersonalInfoDto)
  personalInfo: CreatePersonalInfoDto;

  @IsNotEmpty({ message: 'Yêu cầu không được để trống' })
  @ValidateNested()
  @Type(() => CreateRequirementsDto)
  requirements: CreateRequirementsDto;

  @IsOptional()
  @IsIn(['active', 'inactive'], { message: 'Trạng thái không hợp lệ' })
  status?: string;
}
