import { read_history_report_ticket_by_admin } from './../../controller/ticket';

import { Router, Request, Response } from "express";
const router = Router();


//users
import { auth_user, check_admin } from '../../controller/users';

//ticket
import { create_ticket, read_all_ticket, read_ticket_by_all_single, read_ticket_single, create_commentText, read_ticket_all_single_by_technician, read_comment_by_technician, update_ticket } from "../../controller/ticket";




router.get('/', auth_user, check_admin, read_all_ticket);
router.get('/read_history_report_ticket_by_admin', auth_user, check_admin, read_history_report_ticket_by_admin)
router.get('/all_single', auth_user, read_ticket_by_all_single);
router.get('/read_comment_by_technician/:ticketID', read_comment_by_technician)
router.get('/all_single_by_technician', auth_user, read_ticket_all_single_by_technician)
router.post('/', auth_user, create_ticket);
router.post('/comment', auth_user, check_admin, create_commentText);
router.get('/read_ticket_single/:TicketID', auth_user,  read_ticket_single)
router.post('/update_ticket', auth_user, update_ticket)




export default router;