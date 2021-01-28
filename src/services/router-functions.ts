import { getRepository } from 'typeorm';
import User, { UserId } from '../entity/user';
import userDTO from './dto/user.dto';
import registrationRequestDTO from './dto/registration-request.dto';

class RouterFunctions {
    static getUser = async (userId: UserId) => {
        const user: any = await getRepository(User)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.type', 'type')
            .leftJoinAndSelect('user.userRoles', 'roles')
            .leftJoinAndSelect('roles.role', 'role')
            .where('user.id = :id', { id: userId })
            .getOne();

        if (!user) {
            throw new Error('User not found');
        }

        return userDTO(user);
    };

    static getUsers = async () => {
        const users: Array<User> = await getRepository(User)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.type', 'type')
            .leftJoinAndSelect('user.userRoles', 'roles')
            .leftJoinAndSelect('roles.role', 'role')
            .getMany();

        if (!users) {
            return [];
        }

        return users.map((user: User) => userDTO(user));
    };

    static getRegistrationRequest = async (userId: UserId) => {
        const user: User = await getRepository(User)
            .createQueryBuilder('user')
            .where({ registrationApproved: false, id: userId })
            .getOne();

        if (!user) {
            throw new Error('User not found');
        }

        return registrationRequestDTO(user);
    };

    static getRegistrationRequests = async () => {
        const users: Array<User> = await getRepository(User)
            .createQueryBuilder('user')
            .where({ registrationApproved: false })
            .getMany();

        if (!users) {
            return [];
        }

        return users.map((user: User) => registrationRequestDTO(user));
    };
}

export default RouterFunctions;
