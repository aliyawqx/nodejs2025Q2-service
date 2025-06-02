import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdatePasswordDto } from './dto/update-password.dto.js';
import { User } from './interfaces/user.interface.js';

@Injectable()
export class UserService {
  private users: User[] = [];

  findAll(): Omit<User, 'password'>[] {
    return this.users.map(({ password, ...user }) => user);
  }

  findOne(id: string): Omit<User, 'password'> {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return undefined;
  }

  create(createUserDto: CreateUserDto): Omit<User, 'password'> {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    const { password, ...result } = newUser;
    return result;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): Omit<User, 'password'> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return undefined;

    if (this.users[userIndex].password !== updatePasswordDto.oldPassword) {
      throw new Error('Old password is incorrect');
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      password: updatePasswordDto.newPassword,
      version: this.users[userIndex].version + 1,
      updatedAt: Date.now(),
    };

    const { password, ...result } = this.users[userIndex];
    return result;
  }

  remove(id: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
    return this.users.length !== initialLength;
  }
}