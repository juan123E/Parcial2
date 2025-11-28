import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTokenDto } from './dto/create-token.dto';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async create(createTokenDto: CreateTokenDto) {
    const token = this.tokenRepository.create(createTokenDto);
    return await this.tokenRepository.save(token);
  }

  async findOne(id: string) {
    const token = await this.tokenRepository.findOneBy({ id });
    if (!token) return false;
    return token.active && token.reqLeft > 0;
  }

  async reduceReqLeft(id: string) {
    const token = await this.tokenRepository.findOneBy({ id });
    if (!token) throw new NotFoundException('Token not found');
    
    if (token.reqLeft > 0) {
      token.reqLeft -= 1;
      await this.tokenRepository.save(token);
    }
    return true;
  }
}