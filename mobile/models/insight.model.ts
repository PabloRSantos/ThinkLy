import { TopicModel } from "./topic.model";

export type InsightModel = {
  id: number;
  title: string;
  userId: number;
  topics?: TopicModel[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
