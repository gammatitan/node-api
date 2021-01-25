import { getManager } from 'typeorm';
import { ROLE_SUPER_ADMIN_GKA } from '../entity/role';
import { TYPE_ADMIN } from '../entity/type';
import UserFactory from '../services/factory/user.factory';
import Command from './command';

/**
 * Description:
 * Creates a super admin
 *
 * Arguments:
 * firstName: the users first name
 * lastName: the users last name
 * phoneNumber: the users phone number
 * emailAddress: the users email
 * password: the users password
 *
 * Example:
 * ts-node src/commands/create-super-admin-command.ts --firstName="Jake" --lastName="Brown" --phoneNumber="07777777777" --emailAddress="me@jake-brown.co.uk" --password="pacman"
 */
class CreateSuperAdminCommand extends Command {
    execute = async () => {
        try {
            await this.connectToDb();

            const values = {
                firstName: this.getArg('firstName'),
                lastName: this.getArg('lastName'),
                emailAddress: this.getArg('emailAddress'),
                phoneNumber: this.getArg('phoneNumber'),
                password: this.getArg('password'),
            };

            await UserFactory.createAdmin(values, TYPE_ADMIN, ROLE_SUPER_ADMIN_GKA);
        } catch (e) {
            throw new Error(e);
        }

        process.exit();
    };
}

const command = new CreateSuperAdminCommand();

command.execute();
