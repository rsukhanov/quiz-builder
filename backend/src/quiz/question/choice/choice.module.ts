import { Module } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { PrismaModule } from 'src/general/prisma/prisma.module';

@Module({
  providers: [ChoiceService],
  imports: [PrismaModule],
  exports: [ChoiceService],
})
export class ChoiceModule {}
