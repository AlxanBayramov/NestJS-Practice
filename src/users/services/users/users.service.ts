import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser,SerializedUser } from 'src/users/types';
import {User } from 'src/users/schemas/User.schema';
import { createUserDto,updateUserDto } from 'src/users/dtos/User.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel : Model<User>){}

    private users : IUser[]  = [
        {
            email : 'alxa@go',
            password : 'test',
            username: 'khan010'
        },
        {
            email : 'alxa@goc',
            password : 'testa',
            username: 'khan0ww10'
        },
        {
            email : 'alxa@gos',
            password : 'tesaat',
            username: 'khan0ww10'
        },{
            email : 'alxa@gaao',
            password : 'test',
            username: 'khan01aa0'
        }
    ]

    getUsers(){
        return this.userModel.find()
    }
    getUserById(id:string){
        return this.userModel.findById(id)
    }

    createUser(createUserDto:createUserDto){
        const newUser = new this.userModel(createUserDto)    
        return newUser.save();
    }
    updateUser(id:string,updateUserDto:updateUserDto){
        return this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true})
    }
    removeUser(id:string){
        return this.userModel.findByIdAndDelete(id)
    }

}
