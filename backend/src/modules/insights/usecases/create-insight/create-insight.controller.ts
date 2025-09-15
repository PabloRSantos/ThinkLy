import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CreateInsightRequestDto } from '../../domain/dtos/create-insight-request.dto';
import { CreateInsightUseCase } from './create-insight.usecase';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/common/guards/auth.guard';
import { User } from '@/common/decorators/user.decorator';
import { UserModel } from '@/modules/auth/domain/models/user.model';

@Controller('insights')
@ApiTags('Insights')
export class CreateInsightController {
  constructor(private readonly createInsightUseCase: CreateInsightUseCase) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @User() user: UserModel,
    @Body() payload: CreateInsightRequestDto,
  ) {
    await this.createInsightUseCase.execute(user.id, payload);

    return {
      status: HttpStatus.CREATED,
    };
  }
}
