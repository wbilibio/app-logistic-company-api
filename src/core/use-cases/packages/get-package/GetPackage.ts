import { Package } from '../../../../core/entities';
import { EntityNotFoundException } from '../../../exceptions';
import { IPackageRepository } from '../../../repositories';
import { ValidateParams } from '../../../utils';
import { GetPackageInput } from './GetPackageInput';
import { GetPackageOutput, Transactions } from './GetPackageOutput';

export class GetPackage {
  constructor(
    private readonly _repository: IPackageRepository
  ) {}

  @ValidateParams(GetPackageInput)
  public async execute({ id, storage_location_id }: GetPackageInput): Promise<GetPackageOutput> {
    const hasEntity = await this._repository.findOne({ data: { id}, storage_location_id });

    if(!hasEntity){
      throw new EntityNotFoundException(`Package with id '${id}'`);
    }

    const transactions = await this.getTransactions(hasEntity);
    return {
      ...hasEntity,
      transactions,
      storage_location: {
        id: hasEntity.storage_location?.id,
        name: hasEntity.storage_location?.name,
        lat: hasEntity.storage_location?.lat,
        lng: hasEntity.storage_location?.lng,
      },
    };
  }

  private async getTransactions(entity: Package): Promise<Transactions[]>{
    if(!entity.transactions || (entity.transactions && entity.transactions.length === 0)) return [];
    return await Promise.all(
      entity.transactions.map(async ({ id, storage_location_origin, stops, status, destination }) => {
         return {
          id,
          status,
          origin: { 
            id: storage_location_origin?.id as string, 
            name: storage_location_origin?.name as string, 
            lat: storage_location_origin?.lat as string, 
            lng: storage_location_origin?.lng as string 
          },
          destination,
          stops
        }
      })
    )
  }
}
