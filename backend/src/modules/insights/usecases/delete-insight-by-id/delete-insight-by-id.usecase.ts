import { Injectable, NotFoundException } from '@nestjs/common';
import { InsightRepository } from '../../infra/database/insight.repository';

@Injectable()
export class DeleteInsightByIdUseCase {
  constructor(private readonly insightRepository: InsightRepository) {}

  async execute(id: number, userId: number): Promise<void> {
    const insight = await this.insightRepository.findById(id);

    if (!insight || insight.userId !== userId) {
      throw new NotFoundException('Insight not found');
    }

    await this.insightRepository.delete(id);
  }
}
