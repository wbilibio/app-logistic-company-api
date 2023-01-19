import { randomUUID } from "crypto";
import { Package, PackageTransation } from "../../../../core/entities";
import { PackageTransactionStatusEnum } from "../../../../core/enums";
import { FakePackageRepository } from "../../../repositories";
import { ListPackage } from "./ListPackage";
import { ListPackageInput } from "./ListPackageInput";
import { ListPackageOutput, Package as PackageOutput, Transactions } from "./ListPackageOutput";


let _repository: FakePackageRepository;
let service: ListPackage;

const storage_location = {
  id: randomUUID(),
  lat: 'Some lat',
  lng: 'Some lng',
  name: 'Some name',
}

const address_point = {
  address: 'Some Address',
  lat: 'Some lat',
  lng: 'Some lng',
  name: 'Some name',
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
  id,
  storage_location_origin,
  destination,
  stops,
  status
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

const output: ListPackageOutput = {
  list: [{ 
    ...entity, 
    storage_location, 
    transactions 
  }] as PackageOutput[],
  count: 1
}

describe('ListPackage', () => {
  beforeAll(() => {
    _repository = new FakePackageRepository();
    service = new ListPackage(_repository);

    _repository.findMany.mockResolvedValue({ list: [entity], count: 1 })
  });

  const input: ListPackageInput = {
    name: 'Some name',
    storage_location_id: randomUUID(),
    page: 0,
    per_page: 20
  };

  it.each([
    {
      should: 'list exists records',
      input,
      setup: () => {
      },
      expected: (value: any) => {
        expect(value).toEqual(output)
        expect(_repository.findMany).toBeCalledWith(input)
      },
    },
        {
      should: 'get an exists record when transations is empty',
      input,
      setup: () => {
        _repository.findMany.mockResolvedValueOnce({ list: [{...entity, transactions: []}], count: 1 })
      },
      expected: (value: any) => {
        const customOutput = {...output.list[0], transactions: []}
        expect(value).toEqual({ list: [customOutput], count: 1 })
        expect(_repository.findMany).toBeCalledWith(input)
      },
    },
    {
      should: 'get an exists record when transations is undefined',
      input,
      setup: () => {
        _repository.findMany.mockResolvedValueOnce({ list: [{...entity, transactions: undefined}], count: 1 })
      },
      expected: (value: any) => {
        const customOutput = {...output.list[0], transactions: []}
        expect(value).toEqual({ list: [customOutput], count: 1 })
        expect(_repository.findMany).toBeCalledWith(input)
      },
    },
  ])('Should $should', async ({ expected, input, setup }) => {
    if(setup) setup();

    await service
      .execute(input as unknown as ListPackageInput)
      .then((result) => expected(result))
      .catch((err) => {
        expected(err)
      });
  });
});
