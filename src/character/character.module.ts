import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Location } from '../location/entities/location.entity';
import { TokenModule } from '../token/token.module';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
  imports: [
    TypeOrmModule.forFeature([Character, Location]),
    TokenModule
  ]
})
export class CharacterModule {}