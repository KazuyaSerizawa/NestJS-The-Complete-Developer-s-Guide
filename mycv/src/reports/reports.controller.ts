import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { ApproveReportDto } from "./dtos/approve-report.dto";
import { CreateReportDto } from "./dtos/create-report.dto";
import { ReportsService } from "./reports.service";

@Controller("reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }
  @Patch(":id")
  approveReport(@Param("id") id: string, @Body() body: ApproveReportDto) {}
}
