// apps/api/src/visits/visits.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class RecordVisitDto {
    @IsString()
    @IsNotEmpty()
    personId: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    referrer?: string;
}

@Controller('visits')
export class VisitsController {
    constructor(private readonly visitsService: VisitsService) { }

    @Post()
    async record(@Body() payload: RecordVisitDto) {
        return this.visitsService.recordVisit(payload);
    }

    @Get(':personId')
    async getHistory(@Param('personId') personId: string) {
        return this.visitsService.getHistory(personId);
    }
}