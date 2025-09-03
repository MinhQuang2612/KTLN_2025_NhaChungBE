import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional, IsIn, ValidateNested, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAddressDto {
  @IsNotEmpty({ message: 'Đường không được để trống' })
  @IsString({ message: 'Đường phải là chuỗi' })
  street: string;

  @IsNotEmpty({ message: 'Phường không được để trống' })
  @IsString({ message: 'Phường phải là chuỗi' })
  ward: string;

  @IsNotEmpty({ message: 'Quận không được để trống' })
  @IsString({ message: 'Quận phải là chuỗi' })
  district: string;

  @IsNotEmpty({ message: 'Thành phố không được để trống' })
  @IsString({ message: 'Thành phố phải là chuỗi' })
  city: string;
}

export class CreateRentPostDto {
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

  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsNotEmpty({ message: 'Giá không được để trống' })
  @IsNumber({}, { message: 'Giá phải là số' })
  price: number;

  @IsNotEmpty({ message: 'Diện tích không được để trống' })
  @IsNumber({}, { message: 'Diện tích phải là số' })
  area: number;

  @IsNotEmpty({ message: 'Loại nhà không được để trống' })
  @IsIn(['nhà nguyên căn', 'phòng trọ', 'chung cư'], { message: 'Loại nhà không hợp lệ' })
  category: string;

  @IsOptional()
  @IsArray({ message: 'Nội thất phải là mảng' })
  @IsString({ each: true, message: 'Mỗi nội thất phải là chuỗi' })
  furniture?: string[];

  @IsOptional()
  @IsArray({ message: 'Tiện ích phải là mảng' })
  @IsString({ each: true, message: 'Mỗi tiện ích phải là chuỗi' })
  utilities?: string[];

  @IsOptional()
  @IsIn(['active', 'inactive'], { message: 'Trạng thái không hợp lệ' })
  status?: string;
}
