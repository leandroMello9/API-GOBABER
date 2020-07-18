import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '../../../services/CreateAppointmentService';
// PARSE ISO = Converte uma string para um formate Date do javascript
// STARTOFHOUR = Pega uma data e coloca os segundos como zero minutos
// IS EQUAL = Comprar duas datas diferentes retorna true se for iguais ou false se forem diferente

class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { provider_id, date } = request.body;
      const parsedDate = parseISO(date);
      // Carrega o nosso service e verifica se  o service esta injetando qualquer dependencia
      const createAppointment = container.resolve(CreateAppointmentService);
      // Novo appointment
      const appointment = await createAppointment.execute({
        provider_id,
        date: parsedDate,
      });
      return response.json(appointment);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default new AppointmentController();
