import { InsightModel } from '../models/insight.model';

export type InsightRepositoryInterface = {
  create(
    payload: Pick<InsightModel, 'title' | 'userId'>,
  ): Promise<InsightModel>;
  listByUserId(userId: number): Promise<InsightModel[]>;
  findById(id: number): Promise<InsightModel | null>;
  delete(id: number): Promise<void>;
};
