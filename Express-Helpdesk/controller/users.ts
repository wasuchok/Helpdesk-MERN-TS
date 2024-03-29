import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm';
import { Users } from '../entity/Users';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../types/User'
import { Not } from "typeorm";
import { Access } from '../entity/Access';

export const read_all_users = async (req: Request, res: Response) => {
    try {
        const userRepository = getRepository(Users);
        const users = await userRepository.find();
        res.send(users);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

export const create_user = async (req : Request, res : Response) => {
    try {
        const { Username } = req.body
        const userRepository = getRepository(Users);
        const existingUser = await userRepository.findOne({ where: { Username } })
        if(existingUser) {
            return res.status(409).send('User with this username already exists' );
        }
        const salt = await bcrypt.genSalt(10)
        req.body.Password = await bcrypt.hash(req.body.Password, salt)
        const newUser = userRepository.create(req.body);
        const result = await userRepository.save(newUser);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

export const update_user = async (req : Request, res : Response) => {
    try {
        const { UserID } = req.body
        const userRepository = getRepository(Users);
        const updatedUser = await userRepository.findOne({ where: { UserID } });
        if (!updatedUser) {
          return res.status(404).send('User not found' );
        }
        userRepository.merge(updatedUser, req.body);
        const result = await userRepository.save(updatedUser);
        res.send("Updated");
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

export const delete_user = async (req : Request, res : Response) => {
    try {
        const userRepository = getRepository(Users);
        const result = await userRepository.delete(req.params.id);
        res.json(result);
    } catch (err) {

    }

}

export const login_user = async (req : Request, res : Response) => {
    try {
        const { Username, Password } = req.body
        const userRepository = getRepository(Users);
        const user = await userRepository.findOne({ where: { Username } })
        if(!user) {
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(Password, user.Password)
        if(!isMatch) {
            return res.status(404).send('Password Invalid')
        }
        const payload = {
            user : {
                UserID : user.UserID,
                Username : user.Username,
                Role : user.Role
            }
        }

        jwt.sign(payload, `${process.env.jwt}`, { expiresIn: 3600 }, (err, token) => {
            if(err) throw err
            res.send(token)
        })

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

export const auth_user = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const token = req.headers['authtoken'];
        if (!token) {
            return res.status(401).send("No token, authorization denied");
          }
        const decoded = jwt.verify(`${token}`, `${process.env.jwt}`) as { user: User };

        req.body.user1  = decoded.user;
        next();

    } catch (err) {
        console.log(err);
        res.status(500).send('JWT Expired');
    }
}

export const current_user = async (req : Request, res : Response) => {
    try {
        const userRepository = getRepository(Users);
        const user = await userRepository.findOne({ where: { UserID : req.body.user1.UserID }, select : ["UserID", "Username", "Email", "Role"] })
        if(!user) {
            return res.status(404).send('User not found' );
        }
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

export const read_all_technician = async (req: Request, res: Response) => {
    try {
        const n1 = 1;
        const n6 = 6;
        const userRepository = getRepository(Users);
        const users = await userRepository
            .createQueryBuilder('users')
            .select([
                'role.RoleName',
                'users.*',
            ])
            .where('users.Role != :n1 AND users.Role != :n2', { n1, n2: n6 })
            .innerJoin('role', 'role', 'users.Role = role.RoleID')
            .getRawMany(); 

        res.send(users);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}


export const check_admin = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const userRepository = getRepository(Users);
        const user = await userRepository.findOne({ where: { UserID : req.body.user1.UserID }, select : ["UserID", "Username", "Email", "Role"] })
        if(user && user.Role == 1) {
            next()
        } else {
            res.status(403).send('Admin Access Denied')
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

export const read_all_access_role = async (req : Request, res : Response) => {
    try {
        const accessRepository = getRepository(Access)
        const access = await accessRepository.find()
        if(access) res.send(access)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

export const create_access = async (req : Request, res : Response) => {
    try {
        const accessRepository = getRepository(Access)
        const newAccess = accessRepository.create(req.body);
        const result = await accessRepository.save(newAccess);
        if(result) res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')        
    }
}

// export const read_all_technician_by_admin = async (req : Request, res : Response) => {
//     try {
//         const userRepository = getRepository(Users);
//         const users = await userRepository
//         .createQueryBuilder('user')
//         .where('user.Role != :role1', { role1: 1 })
//         .andWhere('user.Role != :role2', { role2: 6 })
//         .getMany();
//         if(users) {
//             res.send(users)
//         }
//     } catch (err) {
//         console.log(err)
//         res.status(500).send('Server Error')
//     }
// }