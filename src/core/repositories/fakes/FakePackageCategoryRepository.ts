import { IPackageCategoryRepository } from '../interfaces';

export class FakePackageCategoryRepository
  implements IPackageCategoryRepository {
  update = jest.fn();
  create = jest.fn();
  findOne = jest.fn();
  findMany = jest.fn();
  delete = jest.fn();
}
