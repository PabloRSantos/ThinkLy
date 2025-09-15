import { Injectable, Logger } from '@nestjs/common';
import { TopicRepository } from '../../infra/database/topic.repository';
import { CreateTopicRequestDto } from '../../domain/dtos/create-topic-request.dto';
import { WeatherProvider } from '../../infra/weather/weather-provider';
import { HuggingFaceAiProvider } from '../../infra/huggingface/huggingface.provider';
import { InsightRepository } from '../../infra/database/insight.repository';
import { TopicModel } from '../../domain/models/topic.model';
import { InsightModel } from '../../domain/models/insight.model';

@Injectable()
export class CreateTopicUseCase {
  private readonly logger = new Logger(CreateTopicUseCase.name);

  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly insightRepository: InsightRepository,
    private readonly weatherProvider: WeatherProvider,
    private readonly aiProvider: HuggingFaceAiProvider,
  ) {}

  async execute(params: CreateTopicRequestDto, userId: number): Promise<void> {
    const insight = await this.insightRepository.findById(params.insightId);

    if (!insight || insight.userId !== userId) {
      throw new Error('Insight not found');
    }

    const previousTopics = await this.topicRepository.listByInsightId(
      params.insightId,
      5,
    );
    this.logger.log(`Find ${previousTopics.length} previous topics`);

    const weather = await this.weatherProvider.getWeatherByLocation(
      params.latitude,
      params.longitude,
    );
    this.logger.log(`Weather data: ${JSON.stringify(weather)}`);

    const newTopic = new TopicModel({
      text: params.text,
      insightId: params.insightId,
      weather,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const aiResponse = await this.aiProvider.generateText(
      this.buildPrompt(insight, [...previousTopics, newTopic]),
    );
    this.logger.log(`AI response: ${aiResponse.substring(0, 100)}...`);

    await this.topicRepository.create({
      ...newTopic,
      answer: aiResponse,
    });
  }

  private buildPrompt(insight: InsightModel, topics: TopicModel[]): string {
    const context: string[] = [
      'Você é um assistente que ajuda a gerar insights com base em registros de humor e dados climáticos.',
      'Gere um resumo que destaque padrões, correlações ou hipóteses sobre como o clima pode estar influenciando o humor.',
      `Insight: ${insight.title}`,
      'Use os seguintes registros como contexto:',
    ];

    for (const topic of topics) {
      const { weather, main, wind, clouds, name: city } = topic.weather || {};

      context.push(
        [
          `Data: ${new Date(topic.createdAt).toLocaleDateString()}`,
          `Humor: ${topic.text}`,
          `Temperatura: ${main.temp}`,
          `Sensação térmica: ${main.feels_like}`,
          `Umidade: ${main.humidity}`,
          `Velocidade do vento: ${wind.speed}`,
          `Cobertura de nuvens: ${clouds.all}`,
          `Descrição: ${weather?.[0]?.description || 'N/A'}`,
          `Localização: ${city || 'N/A'}`,
        ].join('\n'),
      );
    }

    const prompt = context.join('\n\n');
    return prompt;
  }
}
