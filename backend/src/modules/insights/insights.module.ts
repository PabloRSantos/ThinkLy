import { PrismaConnector } from '@/common/database/connection';
import { Module } from '@nestjs/common';
import { CreateInsightController } from './usecases/create-insight/create-insight.controller';
import { GetInsightByIdController } from './usecases/get-insight-by-id/get-insight-by-id.controller';
import { ListInsightsByUserController } from './usecases/list-insights-by-user/list-insights-by-user.controller';
import { DeleteInsightByIdController } from './usecases/delete-insight-by-id/delete-insight-by-id.controller';
import { CreateInsightUseCase } from './usecases/create-insight/create-insight.usecase';
import { GetInsightByIdUseCase } from './usecases/get-insight-by-id/get-insight-by-id.usecase';
import { ListInsightsByUserUseCase } from './usecases/list-insights-by-user/list-insights-by-user.usecase';
import { DeleteInsightByIdUseCase } from './usecases/delete-insight-by-id/delete-insight-by-id.usecase';
import { WeatherProvider } from './infra/weather/weather-provider';
import { InsightRepository } from './infra/database/insight.repository';
import { TopicRepository } from './infra/database/topic.repository';
import { CreateTopicController } from './usecases/create-topic/create-topic.controller';
import { CreateTopicUseCase } from './usecases/create-topic/create-topic.usecase';
import { HuggingFaceAiProvider } from './infra/huggingface/huggingface.provider';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [
    CreateInsightController,
    GetInsightByIdController,
    ListInsightsByUserController,
    DeleteInsightByIdController,
    CreateTopicController,
  ],
  providers: [
    PrismaConnector,
    WeatherProvider,
    HuggingFaceAiProvider,
    InsightRepository,
    TopicRepository,
    CreateInsightUseCase,
    GetInsightByIdUseCase,
    ListInsightsByUserUseCase,
    DeleteInsightByIdUseCase,
    CreateTopicUseCase,
  ],
})
export class InsightsModule {}
