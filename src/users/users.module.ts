import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/User.schema';

@Module({
  imports : [MongooseModule.forFeature([{
    name : User.name,
    schema : UserSchema
  }])],
  controllers: [UsersController],
  providers: [{
    provide : 'USER_SERVICE',
    useClass : UsersService
  }]
})
export class UsersModule {}
