import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CreateTopicUseCase } from './create-topic.usecase';
import { CreateTopicRequestDto } from '../../domain/dtos/create-topic-request.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/common/guards/auth.guard';
import { User } from '@/common/decorators/user.decorator';
import { UserModel } from '@/modules/auth/domain/models/user.model';

@Controller('topics')
@ApiTags('Topics')
export class CreateTopicController {
  constructor(private readonly createTopicUseCase: CreateTopicUseCase) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() payload: CreateTopicRequestDto,
    @User() user: UserModel,
  ) {
    await this.createTopicUseCase.execute(payload, user.id);

    return {
      status: HttpStatus.CREATED,
    };
  }
}
