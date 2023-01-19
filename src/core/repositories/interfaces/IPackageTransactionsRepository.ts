import { PackageTransation } from '../../entities';

export type FindManyPackageTransactionQuery = {
  name?: string;
  page?: number;
  per_page?: number;
}

export interface IPackageTransactionsRepository {
  create: (data: Partial<PackageTransation>) => Promise<PackageTransation>;
  findOne: (data: Partial<PackageTransation>) => Promise<PackageTransation | undefined>;
  findMany: (data: FindManyPackageTransactionQuery) => Promise<{ list: PackageTransation[], count: number }>;
  update: (data: Partial<PackageTransation>) => Promise<void>;
  delete: (data: PackageTransation) => Promise<void>;
}
