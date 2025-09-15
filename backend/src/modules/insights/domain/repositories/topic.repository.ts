import { TopicModel } from '../models/topic.model';

export type TopicRepositoryInterface = {
  create(payload: TopicModel): Promise<TopicModel>;
  listByInsightId(insightId: number): Promise<TopicModel[]>;
};
