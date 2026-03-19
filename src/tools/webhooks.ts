import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SignalsAPI } from '../api.js';

export function registerWebhookTools(server: McpServer, api: SignalsAPI) {
  server.tool(
    'list_webhooks',
    'List all webhooks configured for a business',
    { business_id: z.string().describe('The business ID') },
    async ({ business_id }) => {
      const result = await api.request(`/businesses/${business_id}/webhooks`, { method: 'GET' });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    'create_webhook',
    'Create a new webhook endpoint for a business',
    {
      business_id: z.string().describe('The business ID'),
      url: z.string().url().describe('The webhook URL to receive POST requests'),
      secret: z.string().optional().describe('Optional shared secret for HMAC signature verification'),
    },
    async ({ business_id, ...data }) => {
      const result = await api.request(`/businesses/${business_id}/webhooks`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    'delete_webhook',
    'Delete a webhook endpoint',
    {
      business_id: z.string().describe('The business ID'),
      webhook_id: z.string().describe('The webhook ID'),
    },
    async ({ business_id, webhook_id }) => {
      const result = await api.request(`/businesses/${business_id}/webhooks/${webhook_id}`, { method: 'DELETE' });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );
}
