import { randomUUID } from "crypto";
import {  EntityNotFoundException } from "../../../exceptions";
import { FakeStorageLocationRepository } from "../../../repositories";
import { DeleteStorageLocation } from "./DeleteStorageLocation";
import { DeleteStorageLocationInput } from "./DeleteStorageLocationInput";


let _repository: FakeStorageLocationRepository;
let service: DeleteStorageLocation;

const name = 'Some name'
const id = randomUUID();

describe('DeleteStorageLocation', () => {
  beforeAll(() => {
    _repository = new FakeStorageLocationRepository();
    service = new DeleteStorageLocation(_repository);

    _repository.findOne.mockResolvedValue({ id, name })
  });

  const input: DeleteStorageLocationInput = {
    id,
  };

  it.each([
    {
      should: 'delete an exists record',
      input,
      setup: () => {
      },
      expected: (value: any) => {
        expect(value).toBeUndefined()
        expect(_repository.delete).toBeCalledWith({ id, name })
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
      .execute(input as unknown as DeleteStorageLocationInput)
      .then((result) => expected(result))
      .catch((err) => {
        expected(err)
      });
  });
});
