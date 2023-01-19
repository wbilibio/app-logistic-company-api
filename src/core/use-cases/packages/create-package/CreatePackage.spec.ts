import { randomUUID } from "crypto";
import { EntityAlreadyExistsException } from "../../../exceptions";
import { FakePackageRepository } from "../../../repositories";
import { CreatePackage } from "./CreatePackage";
import { CreatePackageInput } from "./CreatePackageInput";

let _repository: FakePackageRepository;
let service: CreatePackage;
const name = 'Some name'
const id = randomUUID();

describe('CreatePackage', () => {
  beforeAll(() => {
    _repository = new FakePackageRepository();
    service = new CreatePackage(_repository);

    _repository.findOne.mockResolvedValue({  id, name  })
  });

  const input: CreatePackageInput = {
    name
  };

  it.each([
    {
      should: 'create a new record',
      input,
      setup: () => {
        _repository.findOne.mockResolvedValueOnce(undefined)
        _repository.create.mockResolvedValueOnce({ id })
      },
      expected: (value: any) => {
        expect(value).toEqual({ package_id: id })
        expect(_repository.findOne).toBeCalledWith({ data: { name: input.name } })
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
      .execute(input as unknown as CreatePackageInput)
      .then((result) => expected(result))
      .catch((err) => expected(err));
  });
});
