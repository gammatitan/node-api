import { getRepository } from 'typeorm';
import User, { UserId } from '../entity/user';
import userDTO from './dto/user.dto';

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
}

export default RouterFunctions;
