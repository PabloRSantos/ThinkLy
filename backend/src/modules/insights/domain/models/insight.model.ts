import { TopicModel } from './topic.model';

export class InsightModel {
  id: number | null;
  title: string;
  userId: number;
  topics?: TopicModel[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
