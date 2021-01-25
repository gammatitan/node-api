import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user';

export type UserHistoryType = string;

export const USER_HISTORY_TYPE_NEW_ADMIN_USER: UserHistoryType = 'create_admin_user';
export const USER_HISTORY_TYPE_ACTIVATE: UserHistoryType = 'activate_account';
export const USER_HISTORY_TYPE_DEACTIVATE: UserHistoryType = 'deactivate_account';
export const USER_HISTORY_TYPE_RESET_PASSWORD_REQUEST: UserHistoryType = 'reset_password_request';
export const USER_HISTORY_TYPE_RESET_PASSWORD_COMPLETED: UserHistoryType = 'reset_password_completed';
export const USER_PROFILE_COMPLETE: UserHistoryType = 'profile_complete';

@Entity()
class UserHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @ManyToOne((type) => User)
    user: User;

    @ManyToOne((type) => User)
    updatedBy: User;

    @CreateDateColumn()
    createdAt: Date;
}

export default UserHistory;
