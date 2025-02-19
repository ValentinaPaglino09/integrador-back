import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class ValidateGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
   
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
   
   if (!token) throw new UnauthorizedException()
     
     
      
   try{
    const payload =  await this.jwtService.verify(token, {secret: 'secreto'});
    request['user'] = payload.user.role
   }
   catch{
    throw new UnauthorizedException()
   }
    
   
    return true
  }

  private extractTokenFromHeader(req: Request) : string | undefined {
   const token = req.headers["auth"]
    return token
 
}
}
