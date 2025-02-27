import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto, FindOneParamsDto } from './create-todo.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTodoDto extends IntersectionType(
    FindOneParamsDto,
    PartialType(CreateTodoDto)
) {
    @IsBoolean()
    @IsOptional()
    completed: boolean;

}