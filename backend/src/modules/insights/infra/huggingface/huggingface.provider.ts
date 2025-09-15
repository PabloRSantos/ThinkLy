import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AIProviderInterface } from '../../domain/infra/ai.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HuggingFaceAiProvider implements AIProviderInterface {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly model: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('HUGGINGFACE_API_KEY', '');
    this.baseUrl = this.configService.get<string>('HUGGINGFACE_API_URL', '');
    this.model = this.configService.get<string>('HUGGINGFACE_MODEL', '');
  }

  async generateText(context: string): Promise<string> {
    const response = await axios.request({
      method: 'POST',
      url: this.baseUrl,
      data: {
        model: this.model,
        messages: [
          {
            role: 'user',
            content: context,
          },
        ],
      },
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].message.content;
  }
}
