import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TablesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTableDto: CreateTableDto): Promise<Table> {
    return this.prisma.table.create({
      data: createTableDto,
    });
  }

  async findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  async findOne(id: number): Promise<Table> {
    const table = await this.prisma.table.findUnique({
      where: { id },
    });

    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }

    return table;
  }

  async update(id: number, updateTableDto: UpdateTableDto): Promise<Table> {
    await this.findOne(id);
    return this.prisma.table.update({
      where: { id },
      data: updateTableDto,
    });
  }

  async remove(id: number): Promise<Table> {
    await this.findOne(id);
    return this.prisma.table.delete({
      where: { id },
    });
  }
}

