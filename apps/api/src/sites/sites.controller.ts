// apps/api/src/sites/sites.controller.ts
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { SitesService } from './sites.service';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class PublishSiteDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9.-]+\.[a-z]{2,}$/, { message: 'Address must be a valid domain (e.g., tidepool.zz)' })
    address: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    html: string;

    @IsString()
    @IsNotEmpty()
    authorId: string;
}

@Controller('sites')
export class SitesController {
    constructor(private readonly sitesService: SitesService) { }

    @Post()
    async publish(@Body() payload: PublishSiteDto) {
        return this.sitesService.publish(payload);
    }

    @Get('search')
    async search(@Query('q') query: string) {
        return this.sitesService.search(query);
    }

    @Get(':address')
    async findOne(@Param('address') address: string) {
        return this.sitesService.findByAddress(address);
    }
}