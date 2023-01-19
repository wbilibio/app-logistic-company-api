import { randomUUID } from "crypto";
import { StorageLocation } from "src/core/entities";
import { EntityNotFoundException, StorageLocationLimitException } from "../../../exceptions";
import { FakePackageRepository, FakeStorageLocationRepository } from "../../../repositories";
import { AssociatePackageStorage } from "./AssociatePackageStorage";
import { AssociatePackageStorageInput } from "./AssociatePackageStorageInput";


let _repository: FakePackageRepository;
let _storageLocationRepository: FakeStorageLocationRepository;
let service: AssociatePackageStorage;

const package_id = randomUUID()
const storage_location_id = randomUUID()

describe('AssociatePackageStorage', () => {
  beforeAll(() => {
    _repository = new FakePackageRepository();
    _storageLocationRepository = new FakeStorageLocationRepository();
    service = new AssociatePackageStorage(_repository, _storageLocationRepository);

    _repository.findOne.mockResolvedValue({ id: package_id })
    _storageLocationRepository.findOne.mockResolvedValue({ id: storage_location_id })
  });

  const input: AssociatePackageStorageInput = {
    package_id,
    storage_location_id
  };

  it.each([
    {
      should: 'associate a storage location an exists package',
      input,
      setup: () => {
      },
      expected: (value: any) => {
        expect(value).toBeUndefined()
        expect(_repository.findOne).toBeCalledWith({ data: { id: input.package_id } })
        expect(_storageLocationRepository.findOne).toBeCalledWith({ id: input.storage_location_id })
        expect(_repository.update).toBeCalledTimes(1);
      },
    },
    {
      should: 'throw if entity package not found',
      input,
      setup: () => {
        _repository.findOne.mockResolvedValueOnce(undefined)
      },
      expected: (value: any) => {
        expect(value).toBeInstanceOf(EntityNotFoundException)
      },
    },
    {
      should: 'throw if entity storage location not found',
      input,
      setup: () => {
        _storageLocationRepository.findOne.mockResolvedValueOnce(undefined)
      },
      expected: (value: any) => {
        expect(value).toBeInstanceOf(EntityNotFoundException)
      },
    },
    {
      should: 'throw if entity storage location reached stock limit',
      input,
      setup: () => {
        _storageLocationRepository.findOne.mockResolvedValueOnce({
          limit_stock: 1,
          packages: [{ id: randomUUID() }]
        } as Partial<StorageLocation>)
      },
      expected: (value: any) => {
        expect(value).toBeInstanceOf(StorageLocationLimitException)
      },
    },
  ])('Should $should', async ({ expected, input, setup }) => {
    if(setup) setup();

    await service
      .execute(input as unknown as AssociatePackageStorageInput)
      .then((result) => expected(result))
      .catch((err) => expected(err));
  });
});
