import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinTable,
    AfterLoad,
    JoinColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { RoleGka, ROLE_CONTENT_MANAGER_GKA, ROLE_PARTNER_MANAGER_GKA, ROLE_SUPER_ADMIN_GKA } from './role';
import Type, { TYPE_ADMIN, TYPE_PARTNER } from './type';
import UserRole from './user-role';
import UserVerification from './user-verification';

export type UserId = number;
export type UserEmailAddress = string;
export type UserPassword = string;
export type UserFirstName = string;
export type UserLastName = string;
export type UserPhoneNumber = string;
export type UserAddressLine1 = string;
export type UserAddressLine2 = string;
export type UserCity = string;
export type UserPostcode = string;
export type UserFirmName = string;
export type UserFullName = string;
export type UserIsAdmin = boolean;
export type UserIsPartner = boolean;

const MAX_LOGIN_ATTEMPTS: number = 5;
export const MIN_PASSWORD_LENGTH: number = 6;
export const REGISTRATION_STATUS_PENDING: string = 'pending';
export const REGISTRATION_STATUS_APPROVED: string = 'approved';
export const REGISTRATION_STATUS_DENIED: string = 'denied';

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    emailAddress: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    addressLine1: string;

    @Column({ nullable: true })
    addressLine2: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    postcode: string;

    @Column({ select: false })
    password: string;

    @Column({ nullable: true })
    firmName: string;

    @Column({ type: 'datetime', nullable: true })
    lastLogin: Date;

    @Column({ default: true })
    activated: boolean;

    @Column({ default: REGISTRATION_STATUS_PENDING })
    registrationStatus: string;

    @Column({ default: 0 })
    failedLoginAttempts: number;

    @ManyToOne(() => Type)
    @JoinColumn()
    type: Type;

    @OneToMany(() => UserRole, (role) => role.user)
    userRoles: UserRole[];

    @OneToOne(() => UserVerification, (userVerification) => userVerification.user, { cascade: ['update'] })
    @JoinTable()
    userVerification: UserVerification;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    fullName: string;

    @AfterLoad()
    getFirstName() {
        this.fullName = this.firstName + ' ' + this.lastName;
    }

    public get isLocked(): boolean {
        return MAX_LOGIN_ATTEMPTS <= this.failedLoginAttempts;
    }

    public get isAdmin(): UserIsAdmin {
        return this.type ? this.type.gka === TYPE_ADMIN : false;
    }

    public get isPartner(): UserIsPartner {
        return this.type ? this.type.gka === TYPE_PARTNER : false;
    }

    public get isSuperAdmin(): boolean {
        return this.hasRole(ROLE_SUPER_ADMIN_GKA);
    }

    public get isContentManager(): boolean {
        return this.hasRole(ROLE_CONTENT_MANAGER_GKA);
    }

    public get isPartnerManager(): boolean {
        return this.hasRole(ROLE_PARTNER_MANAGER_GKA);
    }

    public get rolesVirtualProperty() {
        if (this.userRoles) {
            return this.userRoles.map((userRole: UserRole) => ({
                ...userRole.role,
            }));
        }

        return [];
    }

    public get isRegistrationPending() {
        return this.registrationStatus === REGISTRATION_STATUS_PENDING;
    }

    public get isRegistrationApproved() {
        return this.registrationStatus === REGISTRATION_STATUS_APPROVED;
    }

    public get isRegistrationDenied() {
        return this.registrationStatus === REGISTRATION_STATUS_DENIED;
    }

    private hasRole(roleGka: RoleGka): boolean {
        if (!this.userRoles) {
            return false;
        }

        return this.userRoles.some((userRole: UserRole) => userRole.role.gka === roleGka);
    }
}

export default User;
