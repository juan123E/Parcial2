import { Injectable, BadRequestException, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);

  constructor(
      @InjectRepository(Location)
      private readonly locationRepository: Repository<Location>
    ){}
    async create(createLocationDto: CreateLocationDto) {
      try {
        const location = this.locationRepository.create(createLocationDto)
        await this.locationRepository.save(location)
        return location;
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
    return await this.locationRepository.find({})
   } catch (error) {
    this.handleDBExceptions(error)
   }
  }

  async findOne(id: number) {
    try {
      const location = await this.locationRepository.findOneBy({id})
      if(!location){
        throw new NotFoundException(`Ubicacion con el id ${id} no fue encontrado`)
      }
      return location;
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  async remove(id: number) {
    try {
      const location = await this.findOne(id)
      if(location){
        await this.locationRepository.remove(location)
      }
    } catch (error) {
       this.handleDBExceptions(error)
    }
  }
}
