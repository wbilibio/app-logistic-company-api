import { IStorageLocationRepository } from '../interfaces';

export class FakeStorageLocationRepository
  implements IStorageLocationRepository
{
  update = jest.fn();
  create = jest.fn();
  findOne = jest.fn();
  findMany = jest.fn();
  delete = jest.fn();
}
