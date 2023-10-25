
import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm';
import { Ticket } from '../entity/Ticket';
import { Comment } from '../entity/Comment';


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


export const read_ticket_by_all_single = async (req : Request, res : Response) => {
    try {
        const ticketRepository = getRepository(Ticket);
        const ticket = await ticketRepository.find({ where: { "RequesterID" : req.body.user1.UserID } });
        res.send(ticket);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}



export const read_ticket_single = async (req: Request, res: Response) => {
    try {
        const ticketID = req.params.TicketID;
        const ticketRepository = getRepository(Ticket);

        const ticket = await ticketRepository
            .createQueryBuilder('ticket')
            .select([
                'ticket.*',
                'requester.Username AS Requester_Username',
                'assignee.Username AS Assignee_Username'
            ])
            .innerJoin('users', 'requester', 'ticket.RequesterID = requester.UserID')
            .leftJoin('users', 'assignee', 'ticket.AssigneeID = assignee.UserID')
            .where('ticket.TicketID = :ticketID', { ticketID })
            .getRawOne();

        if (ticket) {
            res.send(ticket);
        } else {
            res.status(404).send('Ticket not found kub');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

export const create_commentText = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const commentRepository = getRepository(Comment)
        const newComment = commentRepository.create(req.body)
        const result = await commentRepository.save(newComment)
        
        if(result) {
            const { TicketID } = req.body
            const ticketRepository = getRepository(Ticket);
            const updatedTicket = await ticketRepository.findOne({ where: { TicketID } });
            if (!updatedTicket) {
              return res.status(404).send('Ticket not found');
            }
            ticketRepository.merge(updatedTicket, { "AssigneeID" : req.body.UserID });
            const result = await ticketRepository.save(updatedTicket);
            res.send(result)
            
        } 
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
        res.send(result);
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