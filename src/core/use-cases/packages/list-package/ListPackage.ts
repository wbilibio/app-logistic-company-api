import { Package } from '../../../../core/entities';
import { IPackageRepository } from '../../../repositories';
import { ValidateParams } from '../../../utils';
import { ListPackageInput } from './ListPackageInput';
import { ListPackageOutput, Transactions } from './ListPackageOutput';

export class ListPackage {
  constructor(
    private readonly _repository: IPackageRepository
  ) {}

  @ValidateParams(ListPackageInput)
  public async execute({ name, page, per_page, storage_location_id }: ListPackageInput): Promise<ListPackageOutput> {
    const { list, count } = await this._repository.findMany({ name, page, per_page, storage_location_id });

    const output = await Promise.all(
      list.map(async (entity) => {
        const transactions = await this.getTransactions(entity);

        const { storage_location, ...rest } = entity;
        return { 
          ...rest, 
          storage_location: {
            id: storage_location?.id, 
            name: storage_location?.name, 
            lat: storage_location?.lat, 
            lng: storage_location?.lng
          },
          transactions 
        }
      })
    )

    return { list: output, count }
  }

  private async getTransactions(entity: Package): Promise<Transactions[]>{

    if(!entity.transactions || (entity.transactions && entity.transactions.length === 0)) return [];
      return entity.transactions.map(({ id, storage_location_origin, destination, stops, status }) => {
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
  }
}
