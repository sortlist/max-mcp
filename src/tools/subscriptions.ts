import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ApiClient } from '../api.js';

export function registerSubscriptionTools(server: McpServer, api: ApiClient) {
  server.tool(
    'list_subscriptions',
    'List all subscriptions (signal monitors) for a business',
    { business_id: z.string().describe('The business ID') },
    async ({ business_id }) => {
      const result = await api.request(`/businesses/${business_id}/subscriptions`, { method: 'GET' });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    'get_subscription',
    'Get details of a specific subscription',
    {
      business_id: z.string().describe('The business ID'),
      subscription_id: z.string().describe('The subscription ID'),
    },
    async ({ business_id, subscription_id }) => {
      const result = await api.request(`/businesses/${business_id}/subscriptions/${subscription_id}`, { method: 'GET' });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    'create_subscription',
    'Create a new subscription to a signal for a business',
    {
      business_id: z.string().describe('The business ID'),
      signal_slug: z.string().describe('The signal slug to subscribe to'),
      name: z.string().describe('A name for this subscription'),
      config: z.record(z.any()).optional().describe('Signal-specific configuration'),
    },
    async ({ business_id, ...data }) => {
      const result = await api.request(`/businesses/${business_id}/subscriptions`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    'update_subscription',
    'Update an existing subscription',
    {
      business_id: z.string().describe('The business ID'),
      subscription_id: z.string().describe('The subscription ID'),
      name: z.string().optional().describe('New name'),
      config: z.record(z.any()).optional().describe('Updated configuration'),
    },
    async ({ business_id, subscription_id, ...data }) => {
      const result = await api.request(`/businesses/${business_id}/subscriptions/${subscription_id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    'pause_subscription',
    'Pause a subscription (stops lead collection)',
    {
      business_id: z.string().describe('The business ID'),
      subscription_id: z.string().describe('The subscription ID'),
    },
    async ({ business_id, subscription_id }) => {
      const result = await api.request(`/businesses/${business_id}/subscriptions/${subscription_id}/pause`, { method: 'POST' });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    'resume_subscription',
    'Resume a paused subscription',
    {
      business_id: z.string().describe('The business ID'),
      subscription_id: z.string().describe('The subscription ID'),
    },
    async ({ business_id, subscription_id }) => {
      const result = await api.request(`/businesses/${business_id}/subscriptions/${subscription_id}/resume`, { method: 'POST' });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    'delete_subscription',
    'Delete a subscription permanently',
    {
      business_id: z.string().describe('The business ID'),
      subscription_id: z.string().describe('The subscription ID'),
    },
    async ({ business_id, subscription_id }) => {
      const result = await api.request(`/businesses/${business_id}/subscriptions/${subscription_id}`, { method: 'DELETE' });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );
}
