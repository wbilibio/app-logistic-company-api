import { Package } from '../../entities';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { FindManyPackageQuery, IPackageRepository, FindOnePackageQuery } from '../interfaces';

@EntityRepository(Package)
export class PackageRepository
  extends AbstractRepository<Package>
  implements IPackageRepository {
  async create(data: Partial<Package>): Promise<Package> {
    return await this.repository.save(data)
  }

  async findOne({ data, storage_location_id }: FindOnePackageQuery): Promise<Package | undefined> {
    const query = this.repository.createQueryBuilder('package')
      .withDeleted()
      .leftJoinAndSelect('package.storage_location', 'storage')
      .leftJoinAndSelect('package.transactions', 'transactions')
      .leftJoinAndSelect('transactions.storage_location_origin', 'storage_location_origin')

    if(data){
      query.where(data)
    }

    if(storage_location_id){
      query.andWhere('storage.id = :storage_location_id', { storage_location_id })
    }

    return await query.getOne()
  }

  async findMany({ name, page, per_page, storage_location_id }: FindManyPackageQuery): Promise<{ list: Package[]; count: number; }> {
    const query = this.repository.createQueryBuilder('package')
      .withDeleted()
      .leftJoinAndSelect('package.storage_location', 'storage')
      .leftJoinAndSelect('package.transactions', 'transactions')
      .leftJoinAndSelect('transactions.storage_location_origin', 'storage_location_origin')
    
    if(name){
      query.where('package.name ~* :name', { name })
    }

    if(storage_location_id){
      query.andWhere('storage.id = :storage_location_id', { storage_location_id })
    }

    query.andWhere('package.deleted_at IS NULL')

    if(page && per_page){
      query.offset(page * per_page)
      query.limit(per_page)
    }

    if(!page && per_page){
      query.limit(per_page)
    }

    const [list, count] = await query.getManyAndCount();
    return { list, count };
  }

  async delete(data: Package): Promise<void> {
    await this.repository.softDelete(data.id)
  }

  async update(data: Partial<Package>): Promise<void> {
    await this.repository.save(data)
  }
}
