
import { Router, Request, Response } from "express";
const router = Router();


//users
import { auth_user, check_admin } from '../../controller/users';

//ticket
import { create_ticket, read_all_ticket, read_ticket_by_all_single, read_ticket_single, create_commentText, read_ticket_all_single_by_technician } from "../../controller/ticket";




router.get('/', auth_user, check_admin, read_all_ticket);
router.get('/all_single', auth_user, read_ticket_by_all_single);
router.post('/', auth_user, create_ticket);
router.post('/comment', auth_user, check_admin, create_commentText);
router.get('/:TicketID', auth_user,  read_ticket_single); //ส
router.post('/all_single_by_technician', auth_user,read_ticket_all_single_by_technician)



export default router;