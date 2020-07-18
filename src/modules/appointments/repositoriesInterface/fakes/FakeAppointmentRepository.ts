import IAppointmentRepository from '@modules/appointments/repositoriesInterface/IAppointmentsRepositories';
import AppointmentModel from '@modules/appointments/infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

class AppointmentsRepository implements IAppointmentRepository {
  private appoinment: AppointmentModel[] = [];

  public async findByDate(date: Date): Promise<AppointmentModel | undefined> {
    const findAppointment = this.appoinment.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<AppointmentModel> {
    const appointment = new AppointmentModel();

    Object.assign(appointment, { id: uuid(), provider_id, date });

    this.appoinment.push(appointment);

    return appointment;
  }
}
export default AppointmentsRepository;
