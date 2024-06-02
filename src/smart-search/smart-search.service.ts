import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Brand } from '../brands/brands.entity';
import { DishType } from '../dish-types/dish-types.entity';
import { Diet } from '../diets/diets.entity';
import { City } from '../cities/cities.entity';
import { sanitizeInput } from 'src/utils/sanitizeInput';

type ObjectType = { id: number; name: string; type: string };

@Injectable()
export class SmartSearchService {
  constructor(
    @InjectRepository(City) private cityRepo: Repository<City>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(DishType) private dishTypeRepo: Repository<DishType>,
    @InjectRepository(Diet) private dietRepo: Repository<Diet>,
    private entityManager: EntityManager,
  ) {}

  async extractEntities(searchTerm: string) {
    const terms = sanitizeInput(searchTerm).toLowerCase().split(' ');

    const entities = await this.queryAllEntities(terms);

    const { cities, brands, dishTypes, diets } =
      this.separateEntities(entities);

    return this.combineArrays(diets, dishTypes, cities, brands);
  }

  private async queryAllEntities(terms: string[]): Promise<ObjectType[]> {
    const citiesQuery = this.buildQuery(this.cityRepo, terms, 'city');
    const brandsQuery = this.buildQuery(this.brandRepo, terms, 'brand');
    const dishTypesQuery = this.buildQuery(
      this.dishTypeRepo,
      terms,
      'dishType',
    );
    const dietsQuery = this.buildQuery(this.dietRepo, terms, 'diet');

    const finalQuery = `${citiesQuery} UNION ALL ${brandsQuery} UNION ALL ${dishTypesQuery} UNION ALL ${dietsQuery}`;
    const result = await this.entityManager.query(finalQuery);

    return result.map((entity) => ({
      id: entity.id,
      name: entity.name,
      type: entity.type,
    }));
  }

  private buildQuery(
    repo: Repository<any>,
    terms: string[],
    type: string,
  ): string {
    const tableName = repo.metadata.tableName;
    const conditions = terms
      .map((term) => `LOWER("name") LIKE '%${term}%'`)
      .join(' OR ');

    return `SELECT id, name, '${type}' as type FROM "${tableName}" WHERE ${conditions}`;
  }

  private separateEntities(entities: ObjectType[]) {
    const cities = entities.filter((entity) => entity.type === 'city');
    const brands = entities.filter((entity) => entity.type === 'brand');
    const dishTypes = entities.filter((entity) => entity.type === 'dishType');
    const diets = entities.filter((entity) => entity.type === 'diet');

    return { cities, brands, dishTypes, diets };
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
