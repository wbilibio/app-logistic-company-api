import { randomUUID } from "crypto";
import { PackageTransactionStatusEnum } from "../../../../core/enums";
import { Package, PackageTransation } from "../../../../core/entities";
import { EntityNotFoundException } from "../../../exceptions";
import { FakePackageRepository } from "../../../repositories";
import { GetPackage } from "./GetPackage";
import { GetPackageInput } from "./GetPackageInput";
import { GetPackageOutput, Transactions } from "./GetPackageOutput";


let _repository: FakePackageRepository;
let service: GetPackage;

const address_point = {
  address: 'Some Address',
  lat: 'Some lat',
  lng: 'Some lng',
  name: 'Some name',
}

const storage_location = {
  id: randomUUID(),
  name: 'Some name',
  lat: 'Some lat',
  lng: 'Some lng'
}

const entity: Partial<Package> = {
  id: randomUUID(),
  name: 'Some name',
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: undefined,
  storage_location,
  transactions: [
    {
      id: randomUUID(),
      destination: address_point,
      storage_location_origin: { id: randomUUID(), lat: 'some-lat', lng: 'some-lng', name: 'some-name' },
      status: PackageTransactionStatusEnum.IN_TRANSIT,
      stops: [address_point]
    }
  ]
}

const transactions: Transactions[] = (entity.transactions as PackageTransation[]).map(({
  id, storage_location_origin, destination, stops, status
}) => {
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

const output: GetPackageOutput = {
  id: entity?.id as string,
  name: entity?.name  as string,
  created_at: entity?.created_at as Date,
  updated_at: entity?.updated_at as Date,
  deleted_at: entity?.deleted_at,
  transactions,
  storage_location  
} 

describe('GetPackage', () => {
  beforeAll(() => {
    _repository = new FakePackageRepository();
    service = new GetPackage(_repository);
    _repository.findOne.mockResolvedValue(entity)
  });

  const input: GetPackageInput = {
    id: entity.id as string,
  };

  it.each([
    {
      should: 'get an exists record',
      input,
      setup: () => {
      },
      expected: (value: any) => {
        expect(value).toEqual(output)
        expect(_repository.findOne).toBeCalledWith({ data: { id: input.id } })
      },
    },
    {
      should: 'get an exists record when transations is empty',
      input,
      setup: () => {
          _repository.findOne.mockResolvedValueOnce({ ...entity, transactions: [] })
      },
      expected: (value: any) => {
        expect(value).toEqual({...output, transactions: []})
        expect(_repository.findOne).toBeCalledWith({ data: { id: input.id } })
      },
    },
    {
      should: 'get an exists record when transations is undefined',
      input,
      setup: () => {
          _repository.findOne.mockResolvedValueOnce({ ...entity, transactions: undefined })
      },
      expected: (value: any) => {
        expect(value).toEqual({...output, transactions: []})
        expect(_repository.findOne).toBeCalledWith({ data: { id: input.id } })
      },
    },
    {
      should: 'throw if entity not found',
      input,
      setup: () => {
        _repository.findOne.mockResolvedValueOnce(undefined)
      },
      expected: (value: any) => {
        expect(value).toBeInstanceOf(EntityNotFoundException)
      },
    },
  ])('Should $should', async ({ expected, input, setup }) => {
    if(setup) setup();

    await service
      .execute(input as unknown as GetPackageInput)
      .then((result) => expected(result))
      .catch((err) => {
        expected(err)
      });
  });
});
