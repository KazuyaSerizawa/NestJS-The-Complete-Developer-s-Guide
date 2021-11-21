import { Module } from '@nestjs/common';
import { CpuModule } from 'src/cpu/cpu.module';
import { DiskModule } from 'src/disk/disk.module';
import { ComputerService } from './computer.service';
import { ComputerController } from './computer.controller';

@Module({
  imports: [CpuModule, DiskModule],
  providers: [ComputerService],
  controllers: [ComputerController],
})
export class ComputerModule {}
