import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateAccountInput, CreateAccountOutput } from './dto/create-account.dto';
import { loginInput, loginOutput } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>) { }

  getAll(): Promise<User[]> {
    return this.user.find({})
  }

  async create(
    { email, password, role }: CreateAccountInput
  ): Promise<CreateAccountOutput> {
    try {
      const checkItem = await this.user.findOne({
        where: { email }
      });

      if (checkItem) {
        return {
          success: false, error: '이미 사용중인 이메일 입니다.'
        }
      }

      await this.user.save(this.user.create({
        email, password, role
      }));
      return { success: true }
    } catch (error) {
      return {
        success: false, error: '계정을 생성할 수 없습니다.'
      }
    }
  }

  async login(
    { email, password }: loginInput
  ): Promise<loginOutput> {
    try {
      const checkItem = await this.user.findOne({
        where: { email }
      });

      if (!checkItem) {
        return {
          success: false, error: '회원정보가 없습니다.'
        }
      }

      const compare = await checkItem.checkPassword(password)

      if (!compare) {
        return {
          success: false, error: '비밀번호가 다릅니다.'
        }
      }

      return { success: true, token: "" }

    } catch (error) {
      return {
        success: false, error: '계정을 생성할 수 없습니다.'
      }
    }
  }
}
