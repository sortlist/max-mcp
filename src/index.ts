import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { SignalsAPI } from './api.js';
import { registerSignalTools } from './tools/signals.js';
import { registerBusinessTools } from './tools/businesses.js';
import { registerSubscriptionTools } from './tools/subscriptions.js';
import { registerLeadTools } from './tools/leads.js';
import { registerWebhookTools } from './tools/webhooks.js';

const apiKey = process.env.SIGNALS_API_KEY;
if (!apiKey) {
  console.error('SIGNALS_API_KEY environment variable is required');
  process.exit(1);
}

const api = new SignalsAPI(apiKey);

const server = new McpServer({
  name: 'signals',
  version: '1.0.0',
});

registerSignalTools(server, api);
registerBusinessTools(server, api);
registerSubscriptionTools(server, api);
registerLeadTools(server, api);
registerWebhookTools(server, api);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
