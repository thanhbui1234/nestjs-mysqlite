import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './User.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    return user || null;
  }

  async create(data: { name: string }): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async update(
    id: number,
    data: Partial<{ name: string }>,
  ): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return null; // Or throw an exception if preferred
    }
    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  async remove(id: number): Promise<any | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return null; // Or throw an exception if preferred
    }
    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }
}
