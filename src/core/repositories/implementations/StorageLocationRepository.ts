import { StorageLocation } from '../../entities';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { FindManyStorageLocationQuery, IStorageLocationRepository } from '../interfaces';

@EntityRepository(StorageLocation)
export class StorageLocationRepository
  extends AbstractRepository<StorageLocation>
  implements IStorageLocationRepository {
  async create(data: Partial<StorageLocation>): Promise<StorageLocation> {
    return await this.repository.save(data)
  }

  async findOne(data: Partial<StorageLocation>): Promise<StorageLocation | undefined> {
    const query = this.repository.createQueryBuilder('storageLocation')
      .leftJoinAndSelect('storageLocation.packages', 'packages')
      .where(data)
      .withDeleted()
    return await query.getOne()
  }

  async findMany({ ids, name, page, per_page }: FindManyStorageLocationQuery): Promise<{ list: StorageLocation[]; count: number; }> {
    const query = this.repository.createQueryBuilder('storageLocation')
      .leftJoinAndSelect('storageLocation.packages', 'packages')

    if(name){
      query.where('storageLocation.name ~* :name', { name })
    }

    if(ids && ids.length > 0){
      query.whereInIds(ids)
    }

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

  async delete(data: StorageLocation): Promise<void> {
    await this.repository.softDelete(data.id)
  }

  async update(data: Partial<StorageLocation>): Promise<void> {
    await this.repository.save(data)
  }
}
