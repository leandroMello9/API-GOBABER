import FakeUserRepository from '@modules/users/repositoriesInterface/fakes/FakeUsersRepository';
import AuthenticateUserService from './AnthenticateUserService';
import CreateUserService from './CreateUserService'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
// Describe = Cri uma categoria 'CreateAppontment'
// IT = Test, IT= isso ou isto
describe('Autenticação do usuario', () => {
  it('Autenticando um usuario', async () => {
    const fakeUsersRepository = new FakeUserRepository();

    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
   );
    const user = await createUser.execute({
      email: 'leandrogalaxys3mini@gmail.com',
      name: 'Leandro',
      password: '123456'
    })
    const response = await authenticateUser.execute({
      email: 'leandrogalaxys3mini@gmail.com',
      password: '123456'
    });
    // toHaveProperty = Verifica se uma propiedade foi passada
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  })
  it('Autenticando de um usario que não existe', async () => {
    const fakeUsersRepository = new FakeUserRepository();

    const fakeHashProvider = new FakeHashProvider();


    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
   );
   
 
    // toHaveProperty = Verifica se uma propiedade foi passada
    expect(
      authenticateUser.execute({
        email: 'leandrogalaxys3mini@gmail.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(Error);
    
  })
  it('Criando um usuario e Autenticando o usuario', async () => {
    const fakeUsersRepository = new FakeUserRepository();

    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
   );
    const user = await createUser.execute({
      email: 'leandrogalaxys3mini@gmail.com',
      name: 'Leandro',
      password: '123456'
    })
    const response = await authenticateUser.execute({
      email: 'leandrogalaxys3mini@gmail.com',
      password: '123456'
    });
    // toHaveProperty = Verifica se uma propiedade foi passada
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  })
  it('Criando um usuario e errando a senha no login', async () => {
    const fakeUsersRepository = new FakeUserRepository();

    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
   );
    const user = await createUser.execute({
      email: 'leandrogalaxys3mini@gmail.com',
      name: 'Leandro',
      password: '123456'
    })

    // toHaveProperty = Verifica se uma propiedade foi passada
    expect(
      authenticateUser.execute({
        email: 'leandrogalaxys3mini@gmail.com',
        password: 'pass'
      })
    ).rejects.toBeInstanceOf(Error);
   
  })
 
})