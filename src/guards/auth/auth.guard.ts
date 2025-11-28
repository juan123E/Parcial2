import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokenId = request.headers['x-token-id'];

    if (!tokenId) {
      throw new UnauthorizedException();
    }

    const isValid = await this.tokenService.findOne(tokenId);
    
    if (!isValid) {
      throw new UnauthorizedException();
    }

    return true;
  }
}