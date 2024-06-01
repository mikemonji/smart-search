import { Module } from '@nestjs/common';
import { SmartSearchService } from './smart-search.service';
import { SmartSearchController } from './smart-search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/cities/cities.entity';
import { Brand } from 'src/brands/brands.entity';
import { DishType } from 'src/dish-types/dish-types.entity';
import { Diet } from 'src/diets/diets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, Brand, DishType, Diet])],
  providers: [SmartSearchService],
  controllers: [SmartSearchController],
})
export class SmartSearchModule {}
