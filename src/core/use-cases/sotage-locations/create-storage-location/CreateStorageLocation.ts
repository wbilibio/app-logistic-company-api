import { EntityAlreadyExistsException } from '../../../exceptions';
import { IStorageLocationRepository } from '../../../repositories';
import { ValidateParams } from '../../../utils';
import { CreateStorageLocationInput } from './CreateStorageLocationInput';

export class CreateStorageLocation {
  constructor(
    private readonly _repository: IStorageLocationRepository,
  ) {}

  @ValidateParams(CreateStorageLocationInput)
  public async execute({ name, ...rest }: CreateStorageLocationInput): Promise<void> {
    const hasEntity = await this._repository.findOne({ name });

    if (hasEntity) {
      throw new EntityAlreadyExistsException(`Storage Location with name '${name}'`);
    }

    await this._repository.create({ name, ...rest });
  }
}
