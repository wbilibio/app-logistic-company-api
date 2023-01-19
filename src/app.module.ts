import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PackageController, PackageTransactionController, StorageLocationController } from "./controllers";
import { PackageRepository, PackageTransactionsRepository, StorageLocationRepository } from "./core";
import connectionConfig from "./database/ormconfig";

@Module({
  imports: [
    TypeOrmModule.forFeature([PackageRepository, StorageLocationRepository, PackageTransactionsRepository]),
    TypeOrmModule.forRoot(connectionConfig),
  ],
  providers: [],
  controllers: [PackageController, StorageLocationController, PackageTransactionController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes(PackageController, StorageLocationController, PackageTransactionController);
  }
}
