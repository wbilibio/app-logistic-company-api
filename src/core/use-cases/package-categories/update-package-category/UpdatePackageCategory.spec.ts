import { randomUUID } from "crypto";
import { EntityAlreadyExistsException, EntityNotFoundException } from "../../../exceptions";
import { FakePackageCategoryRepository } from "../../../repositories";
import { UpdatePackageCategory } from "./UpdatePackageCategory";
import { UpdatePackageCategoryInput } from "./UpdatePackageCategoryInput";


let _repository: FakePackageCategoryRepository;
let service: UpdatePackageCategory;

const name = 'Some name'
const id = randomUUID();

describe('UpdatePackage', () => {
  beforeAll(() => {
    _repository = new FakePackageCategoryRepository();
    service = new UpdatePackageCategory(_repository);

    _repository.findOne.mockResolvedValue({ id, name })
    _repository.findOne.mockResolvedValue({ id, name })
  });

  const input: UpdatePackageCategoryInput = {
    id,
    name
  };

  it.each([
    {
      should: 'update an exists record',
      input,
      setup: () => {
      },
      expected: (value: any) => {
        expect(value).toBeUndefined()
        expect(_repository.update).toBeCalledWith(input)
      },
    },
    {
      should: 'throw if entity already exists',
      input,
      setup: () => {
        _repository.findOne.mockResolvedValueOnce({ id, name })
        _repository.findOne.mockResolvedValueOnce({ id: randomUUID(), name })
      },
      expected: (value: any) => {
        expect(value).toBeInstanceOf(EntityAlreadyExistsException)
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
    if (setup) setup();

    await service
      .execute(input as unknown as UpdatePackageCategoryInput)
      .then((result) => expected(result))
      .catch((err) => {
        expected(err)
      });
  });
});
