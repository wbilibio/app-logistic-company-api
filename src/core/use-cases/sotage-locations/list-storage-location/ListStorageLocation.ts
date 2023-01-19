import { IStorageLocationRepository } from '../../../repositories';
import { ValidateParams } from '../../../utils';
import { ListStorageLocationInput } from './ListStorageLocationInput';
import { ListStorageLocationOutput } from './ListStorageLocationOutput';

export class ListStorageLocation {
  constructor(
    private readonly _repository: IStorageLocationRepository,
  ) {}

  @ValidateParams(ListStorageLocationInput)
  public async execute({ name, page, per_page }: ListStorageLocationInput): Promise<ListStorageLocationOutput> {
    const { list, count } = await this._repository.findMany({ name, page, per_page });

    const entities = list.map(entity => {
      const { packages, ...rest } = entity;
      return { ...rest, current_stock: packages?.length };
    })

    return { list: entities, count }
  }
}
