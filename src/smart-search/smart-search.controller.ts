import { Controller, Get, Query } from '@nestjs/common';
import { SmartSearchService } from './smart-search.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Smart Search')
@Controller('smart-search')
export class SmartSearchController {
  constructor(private readonly smartSearchService: SmartSearchService) {}

  @Get()
  @ApiOperation({ summary: 'Search for entities based on a search term' })
  @ApiQuery({
    name: 'term',
    required: true,
    description: 'The search term to find entities',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful search',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          diets: {
            type: 'object',
            properties: { id: { type: 'number' }, name: { type: 'string' } },
          },
          dishTypes: {
            type: 'object',
            properties: { id: { type: 'number' }, name: { type: 'string' } },
          },
          citys: {
            type: 'object',
            properties: { id: { type: 'number' }, name: { type: 'string' } },
          },
          brands: {
            type: 'object',
            properties: { id: { type: 'number' }, name: { type: 'string' } },
          },
        },
      },
    },
  })
  async search(@Query('term') term: string) {
    return this.smartSearchService.extractEntities(term);
  }
}
