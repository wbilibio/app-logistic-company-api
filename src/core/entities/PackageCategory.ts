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


@Entity('package_categories')
export class PackageCategory {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Index()
  @Column({ nullable: false, unique: true })
  public name!: string;

  @JoinColumn({
    referencedColumnName: 'package_category_id',
    name: 'id'
  })
  @OneToMany(() => Package, (package_data) => package_data.package_category, { onUpdate: 'CASCADE' })
  public packages?: Partial<Package>[];

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

  @DeleteDateColumn()
  public deleted_at?: Date;
}
