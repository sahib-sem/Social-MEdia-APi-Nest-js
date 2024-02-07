import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './Dtos/updateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserByUsername(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username });
  }

  async followUser(userId: string, followeeId: string): Promise<boolean> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { followees: followeeId } },
      { new: true },
    );

    if (!user) {
      return false;
    }

    return true;
  }

  async unfollowUser(userId: string, followeeId: string): Promise<boolean> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { followees: followeeId } },
      { new: true },
    );

    if (!user) {
      return false;
    }
    return true;
  }

  async getFollowers(userId: string): Promise<string[]> {
    const user = await this.userModel.findById(userId).populate('followers');

    if (!user) {
      throw new NotFoundException('user is not found');
    }

    return user.followers;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('user can not be found');
    }
    Object.assign(user, updateUserDto);

    return await user.save();
  }
}
