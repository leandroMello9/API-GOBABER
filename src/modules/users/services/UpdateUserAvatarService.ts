import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import UserModel from '../infra/typeorm/entities/User';
import uploadConfig from '../../../config/upload';
import IUserRepository from "../repositoriesInterface/IUserRepository"
import IStorageProvider from '../../../shared/providers/StorageProvider/models/IStorageProvider'
interface IRequest {
  user_id: string;
  avatarFilename: string;
}
@injectable()
class UpdateUserAvatarService {

  constructor(
    @inject('UsersRepository') 
  private repository: IUserRepository,
    @inject('StorageProvider')
   private storageProvider: IStorageProvider
  ) {
   
  }

  public async execute({
    user_id,
    avatarFilename,
  }: IRequest): Promise<UserModel> {
    const user = await this.repository.findById(user_id);
    if (!user) {
      throw new Error('Only authenticate users can change avatar');
    }
    if (user.avatar) {
      this.storageProvider.deleteFile(user.avatar);
    }
    const fileName = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = fileName;
    
    await this.repository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
