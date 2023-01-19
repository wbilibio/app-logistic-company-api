import { PackageTransactionStatusEnum } from '../../../../core/enums';
import { EntityNotFoundException } from '../../../exceptions';
import { IPackageRepository, IPackageTransactionsRepository } from '../../../repositories';
import { ValidateParams } from '../../../utils';
import { UpdatePackageTransactionInput } from './UpdatePackageTransactionInput';

export class UpdatePackageTransaction {
  constructor(
    private readonly _packageRepository: IPackageRepository,
    private readonly _repository: IPackageTransactionsRepository,
  ) {}

  @ValidateParams(UpdatePackageTransactionInput)
  public async execute({ 
    package_transaction_id, 
    status
  }: UpdatePackageTransactionInput): Promise<void> {

    const hasEntity = await this._repository.findOne({ id: package_transaction_id });

    if (!hasEntity) {
      throw new EntityNotFoundException(`Package Transaction with id '${package_transaction_id}'`);
    }

    if(status === PackageTransactionStatusEnum.DELIVERED){
      await this._packageRepository.update({...hasEntity.package, storage_location_id: null })
    }

    await this._repository.update({
      ...hasEntity,
      status
    });
  }
}
