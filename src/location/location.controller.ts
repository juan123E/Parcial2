import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('character')
@UseGuards(AuthGuard)
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(
    @Body() createLocationDto: CreateLocationDto,
    @Headers('x-token-id') tokenId: string
  ) {
    return this.locationService.create(createLocationDto, tokenId);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }
}