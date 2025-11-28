import { Injectable, BadRequestException, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { Character } from 'src/character/entities/character.entity';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);

  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    private readonly tokenService: TokenService,
  ) {}

  async create(createLocationDto: CreateLocationDto, tokenId: string) {
    try {
      const { ownerId, ...locationData } = createLocationDto;

      const owner = await this.characterRepository.findOne({
        where: { id: ownerId },
        relations: ['property']
      });

      if (!owner) throw new NotFoundException(`Character ${ownerId} not found`);
      if (owner.property) throw new BadRequestException(`Character ${ownerId} already owns a property`);

      const location = this.locationRepository.create({
        ...locationData,
        owner,
      });

      await this.locationRepository.save(location);
      await this.tokenService.reduceReqLeft(tokenId);
      
      return location;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    try {
      return await this.locationRepository.find({
        relations: ['favCharacters']
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check logs');
  }
}