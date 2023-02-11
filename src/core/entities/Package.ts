import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PackageCategory } from './PackageCategory';
import { PackageTransation } from './PackageTransation';
import { StorageLocation } from './StorageLocation';


@Entity('packages')
export class Package {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Index()
  @Column({ nullable: false, unique: true })
  public name!: string;

  @JoinColumn({
    name: 'storage_location_id'
  })
  @ManyToOne(() => StorageLocation, (storage_location) => storage_location.packages)
  public storage_location?: Partial<StorageLocation>;

  @Column({ nullable: true })
  public storage_location_id?: string | null;

  @JoinColumn({
    referencedColumnName: 'package_id',
    name: 'id'
  })
  @OneToMany(() => PackageTransation, (package_transaction) => package_transaction.package)
  public transactions?: Partial<PackageTransation>[];

  @JoinColumn({
    name: 'package_category_id'
  })
  @ManyToOne(() => PackageCategory, (package_category) => package_category.packages)
  public package_category: PackageCategory



  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

  @DeleteDateColumn()
  public deleted_at?: Date;
}
