import { IsNotEmpty, IsString, IsDefined } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class FindOneParamsDto {
  @IsString()
  @IsDefined()
  id: string;
}