import { WeatherProviderInterface } from '../infra/weather.interface';

export class TopicModel {
  id?: number;
  text: string;
  answer: string;
  weather: WeatherProviderInterface.WeatherByLocation;
  insightId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(topic?: Partial<TopicModel>) {
    Object.assign(this, topic);
  }
}
