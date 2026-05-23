import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Table } from './entities/table.entity';

@ApiTags('tables')
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new table' })
  @ApiResponse({ status: 201, description: 'The table has been successfully created.', type: Table })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.create(createTableDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tables' })
  @ApiResponse({ status: 200, description: 'Return all tables.', type: [Table] })
  findAll() {
    return this.tablesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a table by id' })
  @ApiResponse({ status: 200, description: 'Return the table.', type: Table })
  @ApiResponse({ status: 404, description: 'Table not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tablesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a table' })
  @ApiResponse({ status: 200, description: 'The table has been successfully updated.', type: Table })
  @ApiResponse({ status: 404, description: 'Table not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.update(id, updateTableDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a table' })
  @ApiResponse({ status: 200, description: 'The table has been successfully deleted.', type: Table })
  @ApiResponse({ status: 404, description: 'Table not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tablesService.remove(id);
  }
}

