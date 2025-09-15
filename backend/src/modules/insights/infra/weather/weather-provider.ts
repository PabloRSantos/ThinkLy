import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { WeatherProviderInterface } from '../../domain/infra/weather.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherProvider implements WeatherProviderInterface {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY', '');
    this.baseUrl = this.configService.get<string>('WEATHER_API_URL', '');
  }

  async getWeatherByLocation(
    lat: string,
    lon: string,
  ): Promise<WeatherProviderInterface.WeatherByLocation> {
    const response = await axios.request({
      url: `${this.baseUrl}/weather`,
      method: 'GET',
      params: {
        appid: this.apiKey,
        lat,
        lon,
      },
    });

    return response.data;
  }
}
