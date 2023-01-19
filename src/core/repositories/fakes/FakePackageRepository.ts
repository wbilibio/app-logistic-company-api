import { IPackageRepository } from '../interfaces';

export class FakePackageRepository
  implements IPackageRepository
{
  update = jest.fn();
  create = jest.fn();
  findOne = jest.fn();
  findMany = jest.fn();
  delete = jest.fn();
}
