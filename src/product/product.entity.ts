import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Catalog } from "../catalog/catalog.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @ManyToOne(() => Catalog, catalog => catalog.products, {nullable: true, onDelete: 'SET NULL'})
    catalog: Catalog;
}