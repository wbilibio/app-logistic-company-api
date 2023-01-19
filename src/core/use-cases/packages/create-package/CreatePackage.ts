import { EntityAlreadyExistsException } from '../../../exceptions';
import { IPackageRepository } from '../../../repositories';
import { ValidateParams } from '../../../utils';
import { CreatePackageInput } from './CreatePackageInput';
import { CreatePackageOutput } from './CreatePackageOutput';

export class CreatePackage {
  constructor(
    private readonly _repository: IPackageRepository,
  ) {}

  @ValidateParams(CreatePackageInput)
  public async execute({ name }: CreatePackageInput): Promise<CreatePackageOutput> {
    const hasEntity = await this._repository.findOne({ data: { name} });

    if (hasEntity) {
      throw new EntityAlreadyExistsException(`Package with name '${name}'`);
    }

    const { id } = await this._repository.create({ name });

    return { package_id: id }
  }
}
