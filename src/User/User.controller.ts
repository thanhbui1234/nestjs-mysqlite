import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './User.entity';
import { UserService } from './User.service';
@ApiTags('users') // Phải khớp tag ở DocumentBuilder
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() data: { name: string }): Promise<User> {
    return this.userService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<{ name: string }>,
  ): Promise<User | null> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  async remove(@Param('id') id: number): Promise<any | null> {
    return this.userService.remove(id);
  }
}
