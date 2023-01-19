import { EntityNotFoundException } from '../../../exceptions';
import { IPackageRepository } from '../../../repositories';
import { ValidateParams } from '../../../utils';
import { DeletePackageInput } from './DeletePackageInput';

export class DeletePackage {
  constructor(
    private readonly _repository: IPackageRepository,
  ) {}

  @ValidateParams(DeletePackageInput)
  public async execute({ id }: DeletePackageInput): Promise<void> {
    const hasEntity = await this._repository.findOne({ data: { id } });

    if(!hasEntity){
      throw new EntityNotFoundException(`Package with id '${id}'`);
    }

    await this._repository.delete(hasEntity);
  }
}
