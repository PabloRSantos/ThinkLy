import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateUserByIdUseCase } from './update-user-by-id.usecase';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserRequestDto } from '../../domain/dtos/update-user-request.dto';

@Controller('users')
@ApiTags('User')
export class UpdateUserByIdController {
  constructor(private readonly updateUserByIdUseCase: UpdateUserByIdUseCase) {}

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() payload: UpdateUserRequestDto,
  ) {
    const response = await this.updateUserByIdUseCase.execute(
      Number(userId),
      payload,
    );

    return response;
  }
}
