import { EntityAlreadyExistsException, EntityNotFoundException, StorageLocationLimitException } from '../../../exceptions';
import { IPackageRepository, IStorageLocationRepository } from '../../../repositories';
import { ValidateParams } from '../../../utils';
import { AssociatePackageStorageInput } from './AssociatePackageStorageInput';

export class AssociatePackageStorage {
  constructor(
    private readonly _repository: IPackageRepository,
    private readonly _storageLocationRepository: IStorageLocationRepository,
  ) {}

  @ValidateParams(AssociatePackageStorageInput)
  public async execute({ package_id, storage_location_id }: AssociatePackageStorageInput): Promise<void> {
    const [hasPackage, hasStorageLocation] = await Promise.all([
      this._repository.findOne({ data: { id: package_id } }),
      this._storageLocationRepository.findOne({ id: storage_location_id }),
    ])

    if (!hasPackage) {
      throw new EntityNotFoundException(`Package with id '${package_id}'`);
    }

    if (!hasStorageLocation) {
      throw new EntityNotFoundException(`Storage Location with id '${storage_location_id}'`);
    }

    if(hasStorageLocation.limit_stock && hasStorageLocation.limit_stock === hasStorageLocation.packages?.length){
      throw new StorageLocationLimitException(hasStorageLocation.name);
    }

    await this._repository.update({ ...hasPackage, storage_location: hasStorageLocation });
  }
}
