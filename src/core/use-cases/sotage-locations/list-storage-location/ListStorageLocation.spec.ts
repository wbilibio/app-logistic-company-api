import { randomUUID } from "crypto";
import {  StorageLocation } from "src/core/entities";
import { FakeStorageLocationRepository } from "../../../repositories";
import { ListStorageLocation } from "./ListStorageLocation";
import { ListStorageLocationInput } from "./ListStorageLocationInput";
import { ListStorageLocationOutput } from "./ListStorageLocationOutput";


let _repository: FakeStorageLocationRepository;
let service: ListStorageLocation;

const entity: StorageLocation = {
  id: randomUUID(),
  name: 'Some name',
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: undefined,
}

const output: ListStorageLocationOutput = {
  list: [entity],
  count: 1
}

describe('ListStorageLocation', () => {
  beforeAll(() => {
    _repository = new FakeStorageLocationRepository();
    service = new ListStorageLocation(_repository);

    _repository.findMany.mockResolvedValue(output)
  });

  const input: ListStorageLocationInput = {
    name: 'Some name',
    page: 0,
    per_page: 20
  };

  it.each([
    {
      should: 'list an exists records',
      input,
      setup: () => {
      },
      expected: (value: any) => {
        expect(value).toEqual(output)
        expect(_repository.findMany).toBeCalledWith(input)
      },
    },
  ])('Should $should', async ({ expected, input, setup }) => {
    if(setup) setup();

    await service
      .execute(input as unknown as ListStorageLocationInput)
      .then((result) => expected(result))
      .catch((err) => {
        expected(err)
      });
  });
});
