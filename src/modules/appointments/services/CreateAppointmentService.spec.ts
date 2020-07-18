import FakeAppointmentRepository from '@modules/appointments/repositoriesInterface/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';
// Describe = Cri uma categoria 'CreateAppontment'
// IT = Test, IT= isso ou isto
describe('CreateAppointment', () => {
  it('Criando um appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1212321321',
    });
    // toHaveProperty = Verifica se uma propiedade foi passada
    expect(appointment).toHaveProperty('date');
    expect(appointment.provider_id).toBe('1212321321');
  });
  it('Não deve ser possivel criar um agendamento na mesma data', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
    const appointmentDate = new Date(2020, 4, 10, 11);
    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1212321321',
    });
    expect(
      await createAppointment.execute({
        date: appointmentDate,
        provider_id: '1212321321',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
