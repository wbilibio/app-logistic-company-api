import { IPackageTransactionsRepository } from '../interfaces';

export class FakePackageTransactionRepository
  implements IPackageTransactionsRepository
{
  update = jest.fn();
  create = jest.fn();
  findOne = jest.fn();
  findMany = jest.fn();
  delete = jest.fn();
}
