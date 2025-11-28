import { Controller, Get, Post, Body, Patch, Param, Headers, ParseIntPipe } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('character')
@UseGuards(AuthGuard)
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(
    @Body() createCharacterDto: CreateCharacterDto,
    @Headers('x-token-id') tokenId: string
  ) {
    return this.characterService.create(createCharacterDto, tokenId);
  }

  @Patch(':id/favorites/:locationId')
  addFavorite(
    @Param('id', ParseIntPipe) id: number,
    @Param('locationId', ParseIntPipe) locationId: number,
    @Headers('x-token-id') tokenId: string
  ) {
    return this.characterService.addFavorite(id, locationId, tokenId);
  }

  @Get(':id/taxes')
  calculateTaxes(
    @Param('id', ParseIntPipe) id: number,
    @Headers('x-token-id') tokenId: string
  ) {
    return this.characterService.calculateTaxes(id, tokenId);
  }
}