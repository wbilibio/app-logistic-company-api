import { EntityAlreadyExistsException } from "../../../exceptions";
import { FakeStorageLocationRepository } from "../../../repositories";
import { CreateStorageLocation } from "./CreateStorageLocation";
import { CreateStorageLocationInput } from "./CreateStorageLocationInput";


let _repository: FakeStorageLocationRepository;
let service: CreateStorageLocation;

const name = 'Some name'

describe('CreateStorageLocation', () => {
  beforeAll(() => {
    _repository = new FakeStorageLocationRepository();
    service = new CreateStorageLocation(_repository);

    _repository.findOne.mockResolvedValue({ name })
  });

  const input: CreateStorageLocationInput = {
    name
  };

  it.each([
    {
      should: 'create a new record',
      input,
      setup: () => {
        _repository.findOne.mockResolvedValueOnce(undefined)
      },
      expected: (value: any) => {
        expect(value).toBeUndefined()
        expect(_repository.findOne).toBeCalledWith({ name: input.name })
        expect(_repository.create).toBeCalledWith({ name: input.name })
      },
    },
    {
      should: 'throw if entity already exists',
      input,
      setup: () => {
      },
      expected: (value: any) => {
        expect(value).toBeInstanceOf(EntityAlreadyExistsException)
      },
    },
  ])('Should $should', async ({ expected, input, setup }) => {
    if(setup) setup();

    await service
      .execute(input as unknown as CreateStorageLocationInput)
      .then((result) => expected(result))
      .catch((err) => expected(err));
  });
});
