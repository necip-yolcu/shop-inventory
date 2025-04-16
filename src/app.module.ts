import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity.ts'],
      synchronize: true,
    }),
    CatalogModule, ProductModule]
})
export class AppModule {}
