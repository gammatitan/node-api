import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import User from './user';

export type UserVerificationPasswordResetToken = string;
export type UserVerificationPasswordResetRequestedAt = Date;
export type UserVerificationPasswordResetAt = Date;

@Entity()
class UserVerification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    passwordResetToken: string;

    @Column({ type: 'datetime', nullable: true })
    passwordResetRequestedAt: Date;

    @Column({ type: 'datetime', nullable: true })
    passwordResetAt: Date;

    @OneToOne((type) => User, (user) => user.userVerification, { cascade: ['update'] })
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    public get isPasswordResetRequestExpired(): boolean {
        return this.passwordRequestExpiryDate < this.passwordResetRequestedAt;
    }

    public get passwordRequestExpiryDate(): Date {
        const expiryDate = new Date();
        const daysOffset = 1; // Expires in 1 day
        expiryDate.setDate(expiryDate.getDate() + daysOffset);

        return expiryDate;
    }
}

export default UserVerification;
