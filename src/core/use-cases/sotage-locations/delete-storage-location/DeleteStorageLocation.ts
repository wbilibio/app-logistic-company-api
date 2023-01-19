import { EntityNotFoundException } from '../../../exceptions';
import { IStorageLocationRepository } from '../../../repositories';
import { ValidateParams } from '../../../utils';
import { DeleteStorageLocationInput } from './DeleteStorageLocationInput';

export class DeleteStorageLocation {
  constructor(
    private readonly _repository: IStorageLocationRepository,
  ) {}

  @ValidateParams(DeleteStorageLocationInput)
  public async execute({ id }: DeleteStorageLocationInput): Promise<void> {
    const hasEntity = await this._repository.findOne({ id });

    if(!hasEntity){
      throw new EntityNotFoundException(`Storage Location with id '${id}'`);
    }

    await this._repository.delete(hasEntity);
  }
}
