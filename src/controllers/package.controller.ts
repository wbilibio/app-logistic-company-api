import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { IPackageRepository, PackageRepository, CreatePackage, UpdatePackage, DeletePackage, GetPackage, ListPackage, AssociatePackageStorage, IStorageLocationRepository, StorageLocationRepository } from '../core';
import { AssociatePackageStorageRequest, CreatePackageRequest, CreatePackageResponse, GetPackageResponse, ListPackageRequest, ListPackageResponse, UpdatePackageRequest } from '../dtos';

@ApiTags('Packages')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('packages')
export class PackageController {
  constructor(
    @InjectRepository(PackageRepository)
    private readonly _repository: IPackageRepository,
    @InjectRepository(StorageLocationRepository)
    private readonly _storageLocationRepository: IStorageLocationRepository
  ){}

    private readonly createUseCase = new CreatePackage(this._repository);
    private readonly updateUseCase = new UpdatePackage(this._repository);
    private readonly deleteUseCase = new DeletePackage(this._repository);
    private readonly getUseCase = new GetPackage(this._repository);
    private readonly listUseCase = new ListPackage(this._repository);
    private readonly associateUseCase = new AssociatePackageStorage(this._repository, this._storageLocationRepository);
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully created.', type: CreatePackageResponse })
  async create(
    @Body() body: CreatePackageRequest,
  ): Promise<CreatePackageResponse> {
    return await this.createUseCase.execute(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ status: HttpStatus.NO_CONTENT, description: 'The record has been successfully updated.' })
  async update(
    @Param('id') id: string,
    @Body() body: UpdatePackageRequest,
  ): Promise<void> {
    await this.updateUseCase.execute({...body, id});
  }

  @Put('associate/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ status: HttpStatus.NO_CONTENT, description: 'The record has been successfully associate.' })
  async associate(
    @Param('id') id: string,
    @Body() body: AssociatePackageStorageRequest,
  ): Promise<void> {
    await this.associateUseCase.execute({...body, package_id: id});
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ status: HttpStatus.NO_CONTENT, description: 'The record has been successfully deleted.' })
  async delete(
    @Param('id') id: string,
  ): Promise<void> {
    await this.deleteUseCase.execute({ id });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Get a Record.', type: GetPackageResponse })
  async get(
    @Param('id') id: string,
  ): Promise<GetPackageResponse> {
    return await this.getUseCase.execute({ id });
  }
  
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'List Records.', type: ListPackageResponse })
  async list(
    @Query() query: ListPackageRequest,
  ): Promise<ListPackageResponse> {
    return await this.listUseCase.execute(query);
  }
}
