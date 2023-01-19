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
import { CreateStorageLocation, UpdateStorageLocation, DeleteStorageLocation, GetStorageLocation, ListStorageLocation, StorageLocationRepository, IStorageLocationRepository } from '../core';
import { CreateStorageLocationRequest, GetStorageLocationResponse, ListStorageLocationRequest, ListStorageLocationResponse, UpdateStorageLocationRequest } from '../dtos';

@ApiTags('Storage Location')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('storage-locations')
export class StorageLocationController {
  constructor(
    @InjectRepository(StorageLocationRepository)
    private readonly _repository: IStorageLocationRepository){}

    private readonly createUseCase = new CreateStorageLocation(this._repository);
    private readonly updateUseCase = new UpdateStorageLocation(this._repository);
    private readonly deleteUseCase = new DeleteStorageLocation(this._repository);
    private readonly getUseCase = new GetStorageLocation(this._repository);
    private readonly listUseCase = new ListStorageLocation(this._repository);
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully created.' })
  async create(
    @Body() body: CreateStorageLocationRequest,
  ): Promise<void> {
    await this.createUseCase.execute(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ status: HttpStatus.NO_CONTENT, description: 'The record has been successfully updated.' })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateStorageLocationRequest,
  ): Promise<void> {
    await this.updateUseCase.execute({...body, id});
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
  @ApiResponse({ status: HttpStatus.OK, description: 'Get a Record.', type: GetStorageLocationResponse })
  async get(
    @Param('id') id: string,
  ): Promise<GetStorageLocationResponse> {
    return await this.getUseCase.execute({ id });
  }
  
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'List Records.', type: ListStorageLocationResponse })
  async list(
    @Query() query: ListStorageLocationRequest,
  ): Promise<ListStorageLocationResponse> {
    return await this.listUseCase.execute(query);
  }
}
