import { EntityAlreadyExistsException } from '../../../exceptions';
import { IPackageCategoryRepository } from '../../../repositories';
import { ValidateParams } from '../../../utils';
import { CreatePackageCategoryInput } from './CreatePackageCategoryInput';
import { CreatePackageCategoryOutput } from './CreatePackageCategoryOutput';

export class CreatePackageCategory {
  constructor(
    private readonly _repository: IPackageCategoryRepository,
  ) { }

  @ValidateParams(CreatePackageCategoryInput)
  public async execute({ name }: CreatePackageCategoryInput): Promise<CreatePackageCategoryOutput> {
    const hasEntity = await this._repository.findOne({ name });

    if (hasEntity) {
      throw new EntityAlreadyExistsException(`PackageCategory with name '${name}'`);
    }

    const { id } = await this._repository.create({ name });

    return { id }
  }
}
