import { Injectable } from '@nestjs/common';
import { CreateInsightRequestDto } from '../../domain/dtos/create-insight-request.dto';
import { InsightRepository } from '../../infra/database/insight.repository';

@Injectable()
export class CreateInsightUseCase {
  constructor(private readonly insightRepository: InsightRepository) {}

  async execute(
    userId: number,
    params: CreateInsightRequestDto,
  ): Promise<void> {
    await this.insightRepository.create({
      title: params.title,
      userId,
    });
  }
}
