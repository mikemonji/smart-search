import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { CitiesModule } from './cities/cities.module';
import { BrandsModule } from './brands/brands.module';
import { DietsModule } from './diets/diets.module';
import { DishTypesModule } from './dish-types/dish-types.module';
import { SmartSearchModule } from './smart-search/smart-search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      migrations: ['src/migrations/*.ts'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    CitiesModule,
    BrandsModule,
    DietsModule,
    DishTypesModule,
    SmartSearchModule,
  ],
})
export class AppModule {}
