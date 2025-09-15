import { Controller, Get, UseGuards } from '@nestjs/common';
import { ListInsightsByUserUseCase } from './list-insights-by-user.usecase';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/common/guards/auth.guard';
import { User } from '@/common/decorators/user.decorator';
import { UserModel } from '@/modules/auth/domain/models/user.model';

@Controller('insights')
@ApiTags('Insights')
export class ListInsightsByUserController {
  constructor(
    private readonly listInsightsByUserUseCase: ListInsightsByUserUseCase,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async findByUserId(@User() user: UserModel) {
    const insights = await this.listInsightsByUserUseCase.execute(user.id);

    return insights;
  }
}
