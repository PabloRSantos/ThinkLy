import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DeleteInsightByIdUseCase } from './delete-insight-by-id.usecase';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/common/guards/auth.guard';
import { User } from '@/common/decorators/user.decorator';
import { UserModel } from '@/modules/auth/domain/models/user.model';

@Controller('insights')
@ApiTags('Insights')
export class DeleteInsightByIdController {
  constructor(
    private readonly deleteInsightByIdUseCase: DeleteInsightByIdUseCase,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @User() user: UserModel) {
    await this.deleteInsightByIdUseCase.execute(Number(id), user.id);

    return {
      status: HttpStatus.NO_CONTENT,
    };
  }
}
