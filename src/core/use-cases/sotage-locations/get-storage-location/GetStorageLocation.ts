import { EntityNotFoundException } from '../../../exceptions';
import { IStorageLocationRepository } from '../../../repositories';
import { ValidateParams } from '../../../utils';
import { GetStorageLocationInput } from './GetStorageLocationInput';
import { GetStorageLocationOutput } from './GetStorageLocationOutput';

export class GetStorageLocation {
  constructor(
    private readonly _repository: IStorageLocationRepository,
  ) {}

  @ValidateParams(GetStorageLocationInput)
  public async execute({ id }: GetStorageLocationInput): Promise<GetStorageLocationOutput> {
    const hasEntity = await this._repository.findOne({ id });

    if(!hasEntity){
      throw new EntityNotFoundException(`Storage Location with id '${id}'`);
    }

    const { packages, ...rest } = hasEntity;

    return { ...rest, current_stock: packages?.length };
  }
}
