// apps/api/src/app.module.ts
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SitesController } from './sites/sites.controller';
import { SitesService } from './sites/sites.service';
import { Site, SiteSchema } from './sites/site.schema';
import { VisitsController } from './visits/visits.controller';
import { VisitsService } from './visits/visits.service';
import { Visit, VisitSchema } from './visits/visit.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/small-web'),
    MongooseModule.forFeature([
      { name: Site.name, schema: SiteSchema },
      { name: Visit.name, schema: VisitSchema },
    ]),
  ],
  controllers: [SitesController, VisitsController],
  providers: [
    SitesService,
    VisitsService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true, transform: true }),
    },
  ],
})
export class AppModule { }