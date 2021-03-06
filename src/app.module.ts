import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { ReceiptModule } from './receipt/receipt.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    ReceiptModule,
    ProductModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ envFilePath: 'ormconfig.env' })],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('TYPEORM_HOST'),
        post: configService.get('TYPEORM_PORT'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        // TODO: might be worth creating a ConfigService of our own. There will probably be need to do some more customizations for
        // tests. Now the e2e tests are ran against the development database, but it'd be better if they had a dedicated test database
        // that we could create and drop easily
        entities:
          process.env.NODE_ENV === 'test'
            ? ['src/**/*.model.ts']
            : [configService.get('TYPEORM_ENTITIES')],
        synchronize: false,
        // TODO: once we can run the e2e tests in isolated environment, this won't be needed
        keepConnectionAlive: process.env.NODE_ENV === 'test',
      }),
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
