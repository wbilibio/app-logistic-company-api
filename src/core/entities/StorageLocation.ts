import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Package } from './Package';
import { PackageTransation } from './PackageTransation';


@Entity('storage_locations')
export class StorageLocation {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Index()
  @Column({ nullable: false, unique: true })
  public name!: string;

  @Column({ nullable: true })
  public street?: string;

  @Column({ nullable: true })
  public number?: string;

  @Column({ nullable: true })
  public city?: string;

  @Column({ nullable: true })
  public neighborhood?: string;

  @Column({ nullable: true })
  public state?: string;

  @Column({ nullable: true })
  public zipcode?: string;

  @Column({ nullable: true })
  public lat?: string;

  @Column({ nullable: true })
  public lng?: string;

  @Column({ nullable: true })
  public limit_stock?: number;

  @JoinColumn({
    referencedColumnName: 'storage_location_id',
    name: 'id'
  })
  @OneToMany(() => Package, (package_data) => package_data.storage_location)
  public packages?: Partial<Package>[];

  @JoinColumn({
    referencedColumnName: 'storage_location_origin_id',
    name: 'id'
  })
  @OneToMany(() => PackageTransation, (package_transaction) => package_transaction.storage_location_origin)
  public transaction_origins?: Partial<PackageTransation>[];

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

  @DeleteDateColumn()
  public deleted_at?: Date;
}
