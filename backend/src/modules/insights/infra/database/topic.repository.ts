import { PrismaConnector } from '@/common/database/connection';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { TopicRepositoryInterface } from '../../domain/repositories/topic.repository';
import { TopicModel } from '../../domain/models/topic.model';

@Injectable()
export class TopicRepository implements TopicRepositoryInterface {
  constructor(private db: PrismaConnector) {}

  async listByInsightId(
    insightId: number,
    limit?: number,
  ): Promise<TopicModel[]> {
    const topics = await this.db.topic.findMany({
      where: { insightId },
      take: limit,
    });

    return topics.map((topic) => plainToClass(TopicModel, topic));
  }

  async create(payload: TopicModel): Promise<TopicModel> {
    const topic = await this.db.topic.create({
      data: payload,
    });

    return plainToClass(TopicModel, topic);
  }
}
