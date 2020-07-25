import FakeUserRepository from '@modules/users/repositoriesInterface/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
// Describe = Cri uma categoria 'CreateAppontment'
// IT = Test, IT= isso ou isto
describe('CreateUser', () => {
  it('Criando um Usuario', async () => {
    const userRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createAppointment = new CreateUserService(
      userRepository,
      fakeHashProvider
    );
    const user = await createAppointment.execute({
      name: 'Leandro de Melo',
      email: 'leandrogalaxys3mini@gmail.com',
      password: '123456'
    });
    // toHaveProperty = Verifica se uma propiedade foi passada
    expect(user).toHaveProperty('id');
  })
  it('Criando um Usuario com e-mail repetido', async () => {
    const userRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createAppointment = new CreateUserService(
      userRepository,
      fakeHashProvider
    );
   await createAppointment.execute({
      name: 'Leandro de Melo',
      email: 'leandrogalaxys3mini@gmail.com',
      password: '123456'
    });
    // toHaveProperty = Verifica se uma propiedade foi passada
    expect(
      createAppointment.execute({
        name: 'Leandro de Melo',
        email: 'leandrogalaxys3mini@gmail.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(Error);
  })
})