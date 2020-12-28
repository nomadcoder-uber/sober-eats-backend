import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware { //상속받음
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      try {
        const decoded = this.jwtService.verify(token.toString());
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) { //여기서 가져온 id를 가지고 user를 찾아야 한다
        
          const {user, ok} = await this.userService.findById(decoded['id']);
          if(ok){
            req['user'] = user;
        }
      } 
      }catch (e) {}
    }
    next();
  }
}