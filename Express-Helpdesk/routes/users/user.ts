import { Router, Request, Response } from "express"
const router = Router()


//users
import { read_all_users, create_user, update_user, delete_user, auth_user, check_admin, login_user, current_user, read_all_technician, create_access, read_all_access_role } from '../../controller/users'



//Users

router.get('/', auth_user, check_admin, read_all_users)
router.post('/',  create_user)
router.put('/', auth_user, update_user)
router.delete('/:id', auth_user, delete_user)
router.get('/curent_user', auth_user, current_user)
// router.get('/choose_technician', auth_user, check_admin, read_all_technician)
router.get('/choose_technician', read_all_technician)

router.get('/read_all_access_role', auth_user, read_all_access_role);
router.post('/create_access', create_access)

//Auth
router.post('/login', login_user);

export default router;