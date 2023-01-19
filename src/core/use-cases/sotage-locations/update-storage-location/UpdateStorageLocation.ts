import { EntityAlreadyExistsException, EntityNotFoundException } from '../../../exceptions';
import { IStorageLocationRepository } from '../../../repositories';
import { ValidateParams } from '../../../utils';
import { UpdateStorageLocationInput } from './UpdateStorageLocationInput';

export class UpdateStorageLocation {
  constructor(
    private readonly _repository: IStorageLocationRepository,
  ) {}

  @ValidateParams(UpdateStorageLocationInput)
  public async execute({ id, name, ...rest }: UpdateStorageLocationInput): Promise<void> {
    const [entity, hasEntityConflict] = await Promise.all([
      this._repository.findOne({ id }),
      this._repository.findOne({ name })
    ]);

    if(!entity){
      throw new EntityNotFoundException(`Storage Location with id '${id}'`);
    }

    if (hasEntityConflict &&  hasEntityConflict.id !== entity?.id) {
      throw new EntityAlreadyExistsException(`Storage Location with name '${name}'`);
    }

    await this._repository.update({ id, name, ...rest });
  }
}
