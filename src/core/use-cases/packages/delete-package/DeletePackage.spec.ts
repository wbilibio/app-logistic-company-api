import { randomUUID } from "crypto";
import { EntityAlreadyExistsException, EntityNotFoundException } from "../../../exceptions";
import { FakePackageRepository } from "../../../repositories";
import { DeletePackage } from "./DeletePackage";
import { DeletePackageInput } from "./DeletePackageInput";


let _repository: FakePackageRepository;
let service: DeletePackage;

const name = 'Some name'
const id = randomUUID();

describe('DeletePackage', () => {
  beforeAll(() => {
    _repository = new FakePackageRepository();
    service = new DeletePackage(_repository);

    _repository.findOne.mockResolvedValue({ id, name })
  });

  const input: DeletePackageInput = {
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
      .execute(input as unknown as DeletePackageInput)
      .then((result) => expected(result))
      .catch((err) => {
        expected(err)
      });
  });
});
