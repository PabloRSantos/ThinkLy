import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetInsightByIdUseCase } from './get-insight-by-id.usecase';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/common/guards/auth.guard';
import { User } from '@/common/decorators/user.decorator';
import { UserModel } from '@/modules/auth/domain/models/user.model';

@Controller('insights')
@ApiTags('Insights')
export class GetInsightByIdController {
  constructor(private readonly getInsightByIdUseCase: GetInsightByIdUseCase) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string, @User() user: UserModel) {
    const insight = await this.getInsightByIdUseCase.execute(
      Number(id),
      user.id,
    );

    return insight;
  }
}
