export type AIProviderInterface = {
  generateText(context: any): Promise<string>;
};
