import { PackageTransactionStatusEnum } from '../../../../core/enums';
import { EntityNotFoundException } from '../../../exceptions';
import { IPackageRepository, IPackageTransactionsRepository, IStorageLocationRepository } from '../../../repositories';
import { ValidateParams } from '../../../utils';
import { CreatePackageTransactionInput } from './CreatePackageTransactionInput';

export class CreatePackageTransaction {
  constructor(
    private readonly _packageRepository: IPackageRepository,
    private readonly _repository: IPackageTransactionsRepository,
  ) {}

  @ValidateParams(CreatePackageTransactionInput)
  public async execute({ 
    package_id, 
    destination, 
    status = PackageTransactionStatusEnum.WAITING_WITHDRAWAL, 
    stops }: CreatePackageTransactionInput): Promise<void> {

    const hasPackage = await this._packageRepository.findOne({ data: { id: package_id } });

    if (!hasPackage) {
      throw new EntityNotFoundException(`Package with id '${package_id}'`);
    }

    await this._repository.create({ 
      package: hasPackage, 
      storage_location_origin: hasPackage.storage_location,
      destination,
      status, 
      stops
    });
  }
}
