import { Router, Request, Response } from "express"
const router = Router()


//users
import { auth_user } from '../../controller/users'

//ticket
import { create_ticket, read_all_ticket, read_ticketb_by_single } from "../../controller/ticket"



//Users
router.get('/', auth_user, read_all_ticket)
router.get('/single', auth_user, read_ticketb_by_single)
router.post('/', auth_user, create_ticket)


export default router;