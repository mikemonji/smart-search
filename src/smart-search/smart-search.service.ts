import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../brands/brands.entity';
import { DishType } from '../dish-types/dish-types.entity';
import { Diet } from '../diets/diets.entity';
import { City } from '../cities/cities.entity';

type ObjectType = { id: number; name: string };

@Injectable()
export class SmartSearchService {
  constructor(
    @InjectRepository(City) private cityRepo: Repository<City>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(DishType) private dishTypeRepo: Repository<DishType>,
    @InjectRepository(Diet) private dietRepo: Repository<Diet>,
  ) {}

  async extractEntities(searchTerm: string) {
    const terms = searchTerm.toLowerCase().split(' ');

    const [cities, brands, dishTypes, diets] = await Promise.all([
      this.queryEntities(this.cityRepo, terms),
      this.queryEntities(this.brandRepo, terms),
      this.queryEntities(this.dishTypeRepo, terms),
      this.queryEntities(this.dietRepo, terms),
    ]);

    return this.combineArrays(cities, brands, dishTypes, diets);
  }

  private async queryEntities<T>(
    repo: Repository<T>,
    terms: string[],
  ): Promise<ObjectType[]> {
    const query = repo.createQueryBuilder('entity');
    terms.forEach((term, index) => {
      const paramName = `term${index}`;
      query.orWhere(`LOWER(entity.name) LIKE :${paramName}`, {
        [paramName]: `%${term}%`,
      });
    });

    const entities = await query.getMany();
    return entities.map((entity) => ({
      id: (entity as any).id,
      name: (entity as any).name,
    }));
  }

  private combineArrays(
    dietArray: ObjectType[],
    dishTypeArray: ObjectType[],
    cityArray: ObjectType[],
    brandArray: ObjectType[],
  ): {
    diets?: ObjectType;
    dishTypes?: ObjectType;
    citys?: ObjectType;
    brands?: ObjectType;
  }[] {
    const finalArray: {
      diets?: ObjectType;
      dishTypes?: ObjectType;
      citys?: ObjectType;
      brands?: ObjectType;
    }[] = [];

    const diets = dietArray.length > 0 ? dietArray : [undefined];
    const dishTypes = dishTypeArray.length > 0 ? dishTypeArray : [undefined];
    const citys = cityArray.length > 0 ? cityArray : [undefined];
    const brands = brandArray.length > 0 ? brandArray : [undefined];

    for (const diet of diets) {
      for (const dishType of dishTypes) {
        for (const city of citys) {
          for (const brand of brands) {
            const combination: {
              diets?: ObjectType;
              dishTypes?: ObjectType;
              citys?: ObjectType;
              brands?: ObjectType;
            } = {};

            if (diet) combination.diets = diet;
            if (dishType) combination.dishTypes = dishType;
            if (city) combination.citys = city;
            if (brand) combination.brands = brand;

            finalArray.push(combination);
          }
        }
      }
    }

    return finalArray;
  }
}
