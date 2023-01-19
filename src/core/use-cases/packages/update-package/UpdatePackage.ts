import { EntityAlreadyExistsException, EntityNotFoundException } from '../../../exceptions';
import { IPackageRepository } from '../../../repositories';
import { ValidateParams } from '../../../utils';
import { UpdatePackageInput } from './UpdatePackageInput';

export class UpdatePackage {
  constructor(
    private readonly _repository: IPackageRepository,
  ) {}

  @ValidateParams(UpdatePackageInput)
  public async execute({ id, name }: UpdatePackageInput): Promise<void> {
    const [entity, hasEntityConflict] = await Promise.all([
      this._repository.findOne({ data: { id } }),
      this._repository.findOne({ data: { name } })
    ]);

    if(!entity){
      throw new EntityNotFoundException(`Package with id '${id}'`);
    }

    if (hasEntityConflict &&  hasEntityConflict.id !== entity?.id) {
      throw new EntityAlreadyExistsException(`Package with name '${name}'`);
    }

    await this._repository.update({ id, name });
  }
}
