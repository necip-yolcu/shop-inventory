import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    //@ManyToOne(() => Catalog, catalog => catalog.products, {nullable: true, onDelete: 'SET NULL'})
    @ManyToOne(
        () => require('../catalog/catalog.entity').Catalog,
        (catalog: any) => catalog.products,
        { nullable: true, onDelete: 'SET NULL' }
    )
    catalog: any;
}