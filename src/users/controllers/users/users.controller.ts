import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import mongoose from 'mongoose';
import { createUserDto, updateUserDto } from 'src/users/dtos/User.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
    constructor(@Inject('USER_SERVICE') private readonly userService: UsersService) { }
    @Get('')
    fetchUsers() {
        return this.userService.getUsers()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    fetchUsersById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if (!isValid) throw new HttpException('user not found ', HttpStatus.BAD_REQUEST)
        const user = this.userService.getUserById(id)

        // if(user) return new SerializedUser(user)
        if (!user) throw new HttpException('user not found ', HttpStatus.BAD_REQUEST)
        return user;
    }
    @Post('/create')
    createUser(@Body() createUserDto: createUserDto) {
        return this.userService.createUser(createUserDto)
    }
    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: updateUserDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if (!isValid) throw new HttpException('user not found ', HttpStatus.BAD_REQUEST)
        const updatedUser = await this.userService.updateUser(id, updateUserDto)
        if (!updatedUser) throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
        return updatedUser._id
    }
    @Delete(':id')
   async deleteUser(@Param("id") id:string){
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if (!isValid) throw new HttpException('user not found ', HttpStatus.BAD_REQUEST)
        const deletedUser = await this.userService.removeUser(id)
        if(!deletedUser) throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
        return {message:'User deleted'}
    }
}
