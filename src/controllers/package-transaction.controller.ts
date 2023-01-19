import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { IPackageRepository, PackageRepository, CreatePackageTransaction, IPackageTransactionsRepository, PackageTransactionsRepository, UpdatePackageTransaction } from '../core';
import { CreatePackageTransactionRequest, UpdatePackageTransactionRequest } from '../dtos';

@ApiTags('Package Transactions')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('package-transactions')
export class PackageTransactionController {
  constructor(
    @InjectRepository(PackageTransactionsRepository)
    private readonly _repository: IPackageTransactionsRepository,
    @InjectRepository(PackageRepository)
    private readonly _packageRepository: IPackageRepository
  ){}

  private readonly createUseCase = new CreatePackageTransaction(
    this._packageRepository,
    this._repository
  );

  private readonly updateUseCase = new UpdatePackageTransaction(
    this._packageRepository,
    this._repository
  );
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully created.' })
  async create(
    @Body() body: CreatePackageTransactionRequest,
  ): Promise<void> {
    await this.createUseCase.execute(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ status: HttpStatus.NO_CONTENT, description: 'The record has been successfully updated.' })
  async update(
    @Param('id') id: string,
    @Body() body: UpdatePackageTransactionRequest,
  ): Promise<void> {
    await this.updateUseCase.execute({...body, package_transaction_id: id});
  }
}
