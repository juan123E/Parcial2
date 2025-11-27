import { Injectable, BadRequestException, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './entities/character.entity';

@Injectable()
export class CharacterService {
  private readonly logger = new Logger(CharacterService.name);

  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>
  ){}
  async create(createCharacterDto: CreateCharacterDto) {
    try {
      const character = this.characterRepository.create(createCharacterDto)
      await this.characterRepository.save(character)
      return character;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any){
    if(error.code === '23505'){
        throw new BadRequestException(error.detail)
      }
      this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, check logs ')
  }

  async findAll() {
    try {
    return await this.characterRepository.find({})
   } catch (error) {
    this.handleDBExceptions(error)
   }
  }

  async findOne(id: number) {
    try {
      const character = await this.characterRepository.findOneBy({id})
      if(!character){
        throw new NotFoundException(`Personaje con el id ${id} no fue encontrado`)
      }
      return character;
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

 async remove(id: number) {
    try {
      const character = await this.findOne(id)
      if(character){
        await this.characterRepository.remove(character)
      }
    } catch (error) {
       this.handleDBExceptions(error)
    }
  }
}
