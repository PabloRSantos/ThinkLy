import { PrismaConnector } from '@/common/database/connection';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { InsightRepositoryInterface } from '../../domain/repositories/insight.repository';
import { InsightModel } from '../../domain/models/insight.model';

@Injectable()
export class InsightRepository implements InsightRepositoryInterface {
  constructor(private db: PrismaConnector) {}

  async create(
    payload: Pick<InsightModel, 'title' | 'userId'>,
  ): Promise<InsightModel> {
    const insight = await this.db.insight.create({
      data: {
        title: payload.title,
        userId: payload.userId,
      },
    });

    return plainToClass(InsightModel, insight);
  }

  async findById(id: number): Promise<InsightModel | null> {
    const insight = await this.db.insight.findUnique({
      where: { id, deletedAt: null },
      include: { topics: true },
    });

    return insight ? plainToClass(InsightModel, insight) : null;
  }

  async listByUserId(userId: number): Promise<InsightModel[]> {
    const insights = await this.db.insight.findMany({
      where: { userId, deletedAt: null },
      include: { topics: true },
    });

    return insights.map((insight) => plainToClass(InsightModel, insight));
  }

  async delete(id: number): Promise<void> {
    await this.db.insight.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }
}
