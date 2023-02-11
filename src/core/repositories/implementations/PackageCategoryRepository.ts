import { PackageCategory } from "../../../core/entities";
import { AbstractRepository, EntityRepository } from "typeorm";
import { FindManyPackageCategoryQuery, IPackageCategoryRepository } from "../interfaces"

@EntityRepository(PackageCategory)
export class PackageCategoryRepository
  extends AbstractRepository<PackageCategory>
  implements IPackageCategoryRepository {
  async create(data: Partial<PackageCategory>): Promise<PackageCategory> {
    return await this.repository.save(data);
  }

  async findOne(data: Partial<PackageCategory>): Promise<PackageCategory | undefined> {
    return await this.repository.findOne(data);
  }

  async findMany({ name, page, per_page }: FindManyPackageCategoryQuery): Promise<{ list: PackageCategory[]; count: number; }> {
    const query = this.repository.createQueryBuilder()
      .orderBy('created_at', 'DESC');

    if (page && per_page) {
      query.offset(page * per_page);
      query.limit(per_page);
    }

    if (!page && per_page) {
      query.limit(per_page);
    }

    if (name) {
      query.where('name *~ :name', { name });
    }

    const [list, count] = await query.getManyAndCount();

    return { list, count };
  }

  async update(data: Partial<PackageCategory>): Promise<void> {
    await this.repository.save(data);
  }

  async delete(data: PackageCategory): Promise<void> {
    await this.repository.softDelete(data);
  }

}
