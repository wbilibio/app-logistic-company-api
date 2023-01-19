import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PackageTransactionStatusEnum } from '../enums';
import { Package } from './Package';
import { StorageLocation } from './StorageLocation';


type AddressPoint = {
  name?: string;
  address?: string;
  lat?: string;
  lng?: string;
}

@Entity('package_transactions')
export class PackageTransation {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Index()
  @Column({ nullable: false, enum: PackageTransactionStatusEnum, type: 'enum' })
  public status!: PackageTransactionStatusEnum;

  @JoinColumn({
    name: 'storage_location_origin_id'
  })
  @ManyToOne(() => StorageLocation, (storage_location) => storage_location.transaction_origins)
  public storage_location_origin?: Partial<StorageLocation>;

  @Column({ type: 'json', nullable: false })
  public destination?: AddressPoint;

  @JoinColumn({
    name: 'package_id'
  })
  @ManyToOne(() => Package, (package_data) => package_data.transactions)
  public package?: Partial<Package>;

  @Column('jsonb', { nullable: true })
  public stops?: AddressPoint[]

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

  @DeleteDateColumn()
  public deleted_at?: Date;
}
