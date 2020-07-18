import FakeUserRepository from '@modules/users/repositoriesInterface/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
// Describe = Cri uma categoria 'CreateAppontment'
// IT = Test, IT= isso ou isto
describe('CreateUser', () => {
  it('Criando um usuario', async () => {
    const userRepository = new FakeUserRepository();
    const createAppointment = new CreateUserService(
      userRepository,
    );
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1212321321',
    });
    // toHaveProperty = Verifica se uma propiedade foi passada
    expect(appointment).toHaveProperty('date');
    expect(appointment.provider_id).toBe('1212321321');
  });