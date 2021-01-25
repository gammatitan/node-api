import { getManager } from 'typeorm';
import Role, { RoleGka } from '../../entity/role';
import User from '../../entity/user';
import UserRole from '../../entity/user-role';

class UserRoleFactory {
    static create = async (user: User, roleGka: RoleGka) => {
        const role = await getManager()
            .getRepository(Role)
            .findOne({ where: { gka: roleGka } });

        if (!role) {
            throw new Error('Role not found');
        }

        const userRole = new UserRole();

        userRole.user = user;
        userRole.role = role;

        return userRole;
    };
}

export default UserRoleFactory;
