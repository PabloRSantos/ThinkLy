import { Injectable } from '@nestjs/common';
import { InsightRepository } from '../../infra/database/insight.repository';
import { InsightModel } from '../../domain/models/insight.model';

@Injectable()
export class ListInsightsByUserUseCase {
  constructor(private readonly insightRepository: InsightRepository) {}

  async execute(userId: number): Promise<InsightModel[] | null> {
    return this.insightRepository.listByUserId(userId);
  }
}
