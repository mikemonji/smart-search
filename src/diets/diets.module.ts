import { Module } from '@nestjs/common';
import { DietsService } from './diets.service';

@Module({
  providers: [DietsService]
})
export class DietsModule {}
