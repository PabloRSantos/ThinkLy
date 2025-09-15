import { Injectable, NotFoundException } from '@nestjs/common';
import { InsightRepository } from '../../infra/database/insight.repository';
import { InsightModel } from '../../domain/models/insight.model';

@Injectable()
export class GetInsightByIdUseCase {
  constructor(private readonly insightRepository: InsightRepository) {}

  async execute(id: number, userId: number): Promise<InsightModel | null> {
    const insight = await this.insightRepository.findById(id);

    if (!insight || insight.userId !== userId) {
      throw new NotFoundException('Insight not found');
    }

    return insight;
  }
}
