import FakeUserRepository from '@modules/users/repositoriesInterface/fakes/FakeUsersRepository';
import AuthenticateUserService from './AnthenticateUserService';
import UpdateUserAvatarService from './UpdateUserAvatarService'
import FakeStorageService from '@shared/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
// Describe = Cri uma categoria 'CreateAppontment'
// IT = Test, IT= isso ou isto
describe('Update user avatar', () => {
  it('Atualizando foto', async () => {
    const fakeUsersRepository = new FakeUserRepository();

    const fakeStorageService = new FakeStorageService();

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageService);

    
    const user = await fakeUsersRepository.create({
        name: 'Leandro',
        email: 'leandro@gmail.com',
        password: '123456'
    })
    await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'teste.jpg'
    })
 
    // toHaveProperty = Verifica se uma propiedade foi passada
    expect(user.avatar).toBe('teste.jpg');
   
  })
  it('Atualizando um usuario que não existe', async () => {
    const fakeUsersRepository = new FakeUserRepository();

    const fakeStorageService = new FakeStorageService();

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageService);

    
   
     
    // toHaveProperty = Verifica se uma propiedade foi passada
    expect(
        updateUserAvatar.execute({
            user_id: 'no-existing-user',
            avatarFilename: 'teste.jpg'
        })
     
    ).rejects.toBeInstanceOf(Error);
   
  })
 
  it('Inserindo uma nova imagem ao usuario', async () => {
    const fakeUsersRepository = new FakeUserRepository();

    const fakeStorageService = new FakeStorageService();

    const deleteFile = jest.spyOn(fakeStorageService, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageService);

    
    const user = await fakeUsersRepository.create({
        name: 'Leandro',
        email: 'leandro@gmail.com',
        password: '123456'
    })
    await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'teste.jpg'
    })
     
    await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'teste2.jpg'
    })
     
    //spy = espionar = se alguma função da nossa aplicação foi disparada

    // toHaveProperty = Verifica se uma propiedade foi passada
    //toHaveBeenCalled = Espero que essa função seja chamada
    //toHaveBeenCalledWith = Espero que essa função seja chamada com um parametro especifico

    expect(deleteFile).toHaveBeenCalledWith('teste.jpg')
    expect(user.avatar).toBe('teste2.jpg')
   
  })
 
  
})