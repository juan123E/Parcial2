import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Character } from './entities/character.entity';
import { Location } from 'src/location/entities/location.entity';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    private readonly tokenService: TokenService,
  ) {}

  async create(createCharacterDto: CreateCharacterDto, tokenId: string) {
    try {
      const character = this.characterRepository.create(createCharacterDto);
      await this.characterRepository.save(character);
      await this.tokenService.reduceReqLeft(tokenId);
      return character;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async addFavorite(characterId: number, locationId: number, tokenId: string) {
    const character = await this.characterRepository.findOne({
      where: { id: characterId },
      relations: ['favPlaces']
    });
    if (!character) throw new NotFoundException(`Character ${characterId} not found`);

    const location = await this.locationRepository.findOneBy({ id: locationId });
    if (!location) throw new NotFoundException(`Location ${locationId} not found`);

    if (!character.favPlaces) character.favPlaces = [];
    character.favPlaces.push(location);
    
    await this.characterRepository.save(character);
    await this.tokenService.reduceReqLeft(tokenId);
    return character;
  }

  async calculateTaxes(id: number, tokenId: string) {
    const character = await this.characterRepository.findOne({
      where: { id },
      relations: ['property']
    });
    if (!character) throw new NotFoundException(`Character ${id} not found`);

    let taxDebt = 0;
    if (character.property) {
      const coef = character.employee ? 0.08 : 0.03;
      taxDebt = character.property.cost * (1 + coef);
    }

    await this.tokenService.reduceReqLeft(tokenId);
    return { taxDebt };
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException('Unexpected error, check logs');
  }
}