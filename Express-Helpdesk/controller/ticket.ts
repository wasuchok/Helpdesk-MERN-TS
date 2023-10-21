import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import { Ticket } from '../entity/Ticket';


export const read_all_ticket = async (req: Request, res: Response) => {
    try {
        const ticketRepository = getRepository(Ticket);
        const ticket = await ticketRepository.find();
        res.send(ticket);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

export const create_ticket = async (req: Request, res: Response) => {
    try {
        const ticketRepository = getRepository(Ticket);
        const newTicket = ticketRepository.create(req.body);
        const result = await ticketRepository.save(newTicket);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

export const update_ticket = async (req: Request, res: Response) => {
    try {
        const { TicketID } = req.body
        const ticketRepository = getRepository(Ticket);
        const updatedTicket = await ticketRepository.findOne({where : { TicketID }});
        if (!updatedTicket) {
          return res.status(404).json({ message: 'User not found' });
        }
        ticketRepository.merge(updatedTicket, req.body);
        const result = await ticketRepository.save(updatedTicket);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

export const delete_ticket = async (req: Request, res: Response) => {
    try {
        const ticketRepository = getRepository(Ticket);
        const result = await ticketRepository.delete(req.params.id);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}