import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishType } from './dish-types.entity';
import { DishTypesService } from './dish-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([DishType])],
  providers: [DishTypesService],
})
export class DishTypesModule {}
