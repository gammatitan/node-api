import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type RoleGka = string;

export const ROLE_SUPER_ADMIN_GKA: RoleGka = 'super_admin';
export const ROLE_PARTNER_MANAGER_GKA: RoleGka = 'partner_manager';
export const ROLE_CONTENT_MANAGER_GKA: RoleGka = 'content_manager';

export const ROLE_GKAS: Array<RoleGka> = [ROLE_SUPER_ADMIN_GKA, ROLE_PARTNER_MANAGER_GKA, ROLE_CONTENT_MANAGER_GKA];

@Entity()
class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    gka: string;
}

export default Role;
