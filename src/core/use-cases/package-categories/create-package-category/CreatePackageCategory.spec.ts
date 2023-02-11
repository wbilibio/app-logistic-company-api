import { randomUUID } from "crypto";
import { EntityAlreadyExistsException, InvalidFieldsException } from "../../../exceptions";
import { FakePackageCategoryRepository } from "../../../repositories";
import { CreatePackageCategory } from "./CreatePackageCategory";
import { CreatePackageCategoryInput } from "./CreatePackageCategoryInput";

let _repository: FakePackageCategoryRepository;
let service: CreatePackageCategory;

const name = 'Some name'
const id = randomUUID();

describe('CreatePackageCategory', () => {
  beforeAll(() => {
    _repository = new FakePackageCategoryRepository();
    service = new CreatePackageCategory(_repository);

    _repository.findOne.mockResolvedValue({ id, name })
  });

  const input: CreatePackageCategoryInput = {
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
        expect(value).toEqual({ id })
        expect(_repository.findOne).toBeCalledWith({ name })
        expect(_repository.create).toBeCalledWith({ name })
      },
    },
    {
      should: 'throw if entity already exists',
      input,
      setup: () => {
      },
      expected: (err: any) => {
        expect(err).toBeInstanceOf(EntityAlreadyExistsException)
      },
    },
    {
      should: 'throw if input is invalid',
      input: { name: undefined },
      setup: () => {
      },
      expected: (err: any) => {
        expect(err).toBeInstanceOf(InvalidFieldsException);
        expect(_repository.findOne).toBeCalledTimes(0);
        expect(_repository.create).toBeCalledTimes(0);
      },
    },
  ])('Should $should', async ({ expected, input, setup }) => {
    if (setup) setup();

    await service
      .execute(input as unknown as CreatePackageCategoryInput)
      .then((result) => expected(result))
      .catch((err) => expected(err));
  });
});
