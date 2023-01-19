import { randomUUID } from "crypto";
import { PackageTransactionStatusEnum } from "../../../../core/enums";
import { EntityNotFoundException } from "../../../exceptions";
import { FakePackageRepository, FakePackageTransactionRepository } from "../../../repositories";
import { UpdatePackageTransaction } from "./UpdatePackageTransaction";
import { UpdatePackageTransactionInput } from "./UpdatePackageTransactionInput";


let _repository: FakePackageTransactionRepository;
let _packageRepository: FakePackageRepository;
let service: UpdatePackageTransaction;

const package_transaction_id = randomUUID()

const entity = {
  id: package_transaction_id,
  package: {
    status: PackageTransactionStatusEnum.SENT
  }
}

describe('UpdatePackageTransaction', () => {
  beforeAll(() => {
    _repository = new FakePackageTransactionRepository();
    _packageRepository = new FakePackageRepository();
    service = new UpdatePackageTransaction(_packageRepository, _repository);
    _repository.findOne.mockResolvedValue(entity)
  });

  const input: UpdatePackageTransactionInput = {
    package_transaction_id,
    status: PackageTransactionStatusEnum.IN_TRANSIT
  };

  it.each([
    {
      should: 'update an existes record',
      input,
      setup: () => {},
      expected: (value: any) => {
        expect(value).toBeUndefined()
        expect(_repository.findOne).toBeCalledWith({ id: input.package_transaction_id })
        expect(_repository.update).toBeCalledTimes(1)
      },
    },
    {
      should: 'update an existes record and deleted package',
      input: { ...input, status: PackageTransactionStatusEnum.DELIVERED },
      setup: () => {},
      expected: (value: any) => {
        expect(value).toBeUndefined()
        expect(_repository.findOne).toBeCalledWith({ id: input.package_transaction_id })
        expect(_repository.update).toBeCalledTimes(1)
        expect(_packageRepository.update).toBeCalledTimes(1)
      },
    },
    {
      should: 'throw if entity package transaction not found',
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
      .execute(input as unknown as UpdatePackageTransactionInput)
      .then((result) => expected(result))
      .catch((err) => expected(err));
  });
});
