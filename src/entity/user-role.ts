import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Role from './role';
import User from './user';

@Entity()
class UserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => User)
    user: User;

    @ManyToOne((type) => Role)
    role: Role;

    @CreateDateColumn()
    createdAt: Date;
}

export default UserRole;
