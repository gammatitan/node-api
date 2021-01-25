import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type TypeGka = string;

export const TYPE_ADMIN: TypeGka = 'admin';
export const TYPE_PARTNER: TypeGka = 'partner';

export const TYPE_GKAS: Array<TypeGka> = [TYPE_ADMIN, TYPE_PARTNER];

@Entity()
class Type {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    gka: string;
}

export default Type;
