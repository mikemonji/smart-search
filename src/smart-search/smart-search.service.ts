import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../brands/brands.entity';
import { DishType } from '../dish-types/dish-types.entity';
import { Diet } from '../diets/diets.entity';
import { City } from '../cities/cities.entity';

@Injectable()
export class SmartSearchService {
  constructor(
    @InjectRepository(City) private cityRepo: Repository<City>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(DishType) private dishTypeRepo: Repository<DishType>,
    @InjectRepository(Diet) private dietRepo: Repository<Diet>,
  ) {}

  async extractEntities(searchTerm: string) {
    const results = [];
    const terms = searchTerm.split(' ');

    const cities = await this.cityRepo
      .createQueryBuilder('city')
      .where('city.name IN (:...terms)', { terms })
      .getMany();

    const brands = await this.brandRepo
      .createQueryBuilder('brand')
      .where('brand.name IN (:...terms)', { terms })
      .getMany();

    const dishTypes = await this.dishTypeRepo
      .createQueryBuilder('dishType')
      .where('dishType.name IN (:...terms)', { terms })
      .getMany();

    const diets = await this.dietRepo
      .createQueryBuilder('diet')
      .where('diet.name IN (:...terms)', { terms })
      .getMany();

    cities.forEach((city) => {
      brands.forEach((brand) => {
        dishTypes.forEach((dishType) => {
          diets.forEach((diet) => {
            results.push({ city, brand, dishType, diet });
          });
        });
      });
    });

    return results;
  }
}
