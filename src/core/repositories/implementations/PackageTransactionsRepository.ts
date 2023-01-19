import { PackageTransation } from '../../entities';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { FindManyPackageTransactionQuery, IPackageTransactionsRepository } from '../interfaces';

@EntityRepository(PackageTransation)
export class PackageTransactionsRepository
  extends AbstractRepository<PackageTransation>
  implements IPackageTransactionsRepository {
  async create(data: Partial<PackageTransation>): Promise<PackageTransation> {
    return await this.repository.save(data)
  }

  async findOne(data: Partial<PackageTransation>): Promise<PackageTransation | undefined> {
    const query = this.repository.createQueryBuilder('packageTransaction')
      .withDeleted()
      .innerJoinAndSelect('packageTransaction.package', 'package')
      .where(data)
    return await query.getOne()
  }

  async findMany({ name, page, per_page }: FindManyPackageTransactionQuery): Promise<{ list: PackageTransation[]; count: number; }> {
    const query = this.repository.createQueryBuilder('packageTransaction')

    if(name){
      query.where('packageTransaction.name ~* :name', { name })
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

  async delete(data: PackageTransation): Promise<void> {
    await this.repository.softDelete(data.id)
  }

  async update(data: Partial<PackageTransation>): Promise<void> {
    await this.repository.save(data)
  }
}
