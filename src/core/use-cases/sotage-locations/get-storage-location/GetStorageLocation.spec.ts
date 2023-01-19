import { randomUUID } from "crypto";
import { Package } from "src/core/entities";
import { EntityNotFoundException } from "../../../exceptions";
import { FakeStorageLocationRepository } from "../../../repositories";
import { GetStorageLocation } from "./GetStorageLocation";
import { GetStorageLocationInput } from "./GetStorageLocationInput";


let _repository: FakeStorageLocationRepository;
let service: GetStorageLocation;

const entity: Partial<Package> = {
  id: randomUUID(),
  name: 'Some name',
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: undefined,
}

describe('GetStorageLocation', () => {
  beforeAll(() => {
    _repository = new FakeStorageLocationRepository();
    service = new GetStorageLocation(_repository);

    _repository.findOne.mockResolvedValue(entity)
  });

  const input: GetStorageLocationInput = {
    id: entity.id as string,
  };

  it.each([
    {
      should: 'get an exists record',
      input,
      setup: () => {
      },
      expected: (value: any) => {
        expect(value).toEqual(entity)
        expect(_repository.findOne).toBeCalledWith({ id: input.id })
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
      .execute(input as unknown as GetStorageLocationInput)
      .then((result) => expected(result))
      .catch((err) => {
        expected(err)
      });
  });
});
