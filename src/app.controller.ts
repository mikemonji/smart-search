import { Controller, Get, Query } from '@nestjs/common';
import { SmartSearchService } from './smart-search/smart-search.service';

@Controller('smart-search')
export class SmartSearchController {
  constructor(private readonly smartSearchService: SmartSearchService) {}

  @Get()
  async search(@Query('term') term: string) {
    return this.smartSearchService.extractEntities(term);
  }
}
