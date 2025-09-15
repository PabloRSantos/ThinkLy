import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteUserByIdUseCase } from './delete-user-by-id.usecase';
import { DeleteUserRequestDto } from '../../domain/dtos/delete-user-request.dto';
import { AuthGuard } from '@/common/guards/auth.guard';
import { UserModel } from '../../domain/models/user.model';
import { User } from '@/common/decorators/user.decorator';

@Controller('users')
@ApiTags('User')
export class DeleteUserByIdController {
  constructor(private readonly deleteUserByIdUseCase: DeleteUserByIdUseCase) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete('/me')
  async deleteUser(
    @User() user: UserModel,
    @Body() payload: DeleteUserRequestDto,
  ) {
    await this.deleteUserByIdUseCase.execute(user.id, payload);
  }
}
