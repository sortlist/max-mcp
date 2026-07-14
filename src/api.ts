import fetch from 'node-fetch';

export class ApiClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = (process.env.MAX_API_URL || 'https://api.yourmax.ai').replace(/\/$/, '');
  }

  async request(endpoint: string, options: any = {}) {
    const url = `${this.baseUrl}/api/v1${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 204) {
      return { success: true };
    }

    if (!response.ok) {
      const body = await response.text();
      let message: string;
      try {
        const json = JSON.parse(body);
        message = json.error || json.errors?.join(', ') || body;
      } catch {
        message = body;
      }
      throw new Error(`API Error (${response.status}): ${message}`);
    }

    return await response.json();
  }

  businessPath(businessId: string) {
    return `/businesses/${businessId}`;
  }
}
