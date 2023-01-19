import { randomUUID } from "crypto";
import { EntityNotFoundException } from "../../../exceptions";
import { FakePackageRepository, FakePackageTransactionRepository } from "../../../repositories";
import { CreatePackageTransaction } from "./CreatePackageTransaction";
import { CreatePackageTransactionInput } from "./CreatePackageTransactionInput";


let _repository: FakePackageTransactionRepository;
let _packageRepository: FakePackageRepository;
let service: CreatePackageTransaction;

const address_point = {
  address: 'Some Address',
  lat: 'Some lat',
  lng: 'Some lng',
  name: 'Some name',
}

const package_id = randomUUID()
const destination = address_point
const stops = [address_point]

describe('CreatePackageTransaction', () => {
  beforeAll(() => {
    _repository = new FakePackageTransactionRepository();
    _packageRepository = new FakePackageRepository();
    service = new CreatePackageTransaction(_packageRepository, _repository);

    _packageRepository.findOne.mockResolvedValue({ data: { id: package_id } })
  });

  const input: CreatePackageTransactionInput = {
    package_id,
    destination,
    stops
  };

  it.each([
    {
      should: 'create a new record',
      input: { ...input, stops: [] },
      setup: () => {

      },
      expected: (value: any) => {
        expect(value).toBeUndefined()
        expect(_packageRepository.findOne).toBeCalledWith({ data: { id: input.package_id } })
        expect(_repository.create).toBeCalledTimes(1)
      },
    },
    {
      should: 'throw if entity package not found',
      input,
      setup: () => {
        _packageRepository.findOne.mockResolvedValueOnce(undefined)
      },
      expected: (value: any) => {
        expect(value).toBeInstanceOf(EntityNotFoundException)
      },
    },
  ])('Should $should', async ({ expected, input, setup }) => {
    if(setup) setup();

    await service
      .execute(input as unknown as CreatePackageTransactionInput)
      .then((result) => expected(result))
      .catch((err) => expected(err));
  });
});
