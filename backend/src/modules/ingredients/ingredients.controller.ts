import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Ingredient } from './entities/ingredient.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all ingredients (public)' })
  @ApiResponse({ status: 200, type: [Ingredient] })
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an ingredient by id (public)' })
  @ApiResponse({ status: 200, type: Ingredient })
  @ApiResponse({ status: 404, description: 'Not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an ingredient (admin)' })
  @ApiResponse({ status: 201, type: Ingredient })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an ingredient (admin)' })
  @ApiResponse({ status: 200, type: Ingredient })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(id, updateIngredientDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an ingredient (admin)' })
  @ApiResponse({ status: 200, type: Ingredient })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientsService.remove(id);
  }
}
