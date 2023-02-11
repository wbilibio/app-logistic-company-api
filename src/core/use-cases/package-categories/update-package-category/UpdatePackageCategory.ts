import { EntityAlreadyExistsException, EntityNotFoundException } from '../../../exceptions';
import { IPackageCategoryRepository } from '../../../repositories';
import { ValidateParams } from '../../../utils';
import { UpdatePackageCategoryInput } from './UpdatePackageCategoryInput';

export class UpdatePackageCategory {
  constructor(
    private readonly _repository: IPackageCategoryRepository,
  ) { }

  @ValidateParams(UpdatePackageCategoryInput)
  public async execute({ id, name }: UpdatePackageCategoryInput): Promise<void> {
    const [entity, hasEntityConflict] = await Promise.all([
      this._repository.findOne({ id }),
      this._repository.findOne({ name })
    ]);

    if (!entity) {
      throw new EntityNotFoundException(`Package category with id '${id}'`);
    }

    if (hasEntityConflict && hasEntityConflict.id !== entity?.id) {
      throw new EntityAlreadyExistsException(`Package category with name '${name}'`);
    }

    await this._repository.update({ id, name });
  }
}
