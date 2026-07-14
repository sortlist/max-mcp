import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ApiClient } from '../api.js';

export function registerLeadTools(server: McpServer, api: ApiClient) {
  server.tool(
    'list_leads',
    'List leads for a business (paginated)',
    {
      business_id: z.string().describe('The business ID'),
      page: z.number().optional().describe('Page number (default: 1)'),
      per_page: z.number().optional().describe('Results per page (default: 25)'),
    },
    async ({ business_id, page, per_page }) => {
      const query = new URLSearchParams();
      if (page) query.set('page', String(page));
      if (per_page) query.set('per_page', String(per_page));
      const qs = query.toString();
      const result = await api.request(`/businesses/${business_id}/leads${qs ? `?${qs}` : ''}`, { method: 'GET' });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    'get_lead',
    'Get details of a specific lead',
    {
      business_id: z.string().describe('The business ID'),
      lead_id: z.string().describe('The lead ID'),
    },
    async ({ business_id, lead_id }) => {
      const result = await api.request(`/businesses/${business_id}/leads/${lead_id}`, { method: 'GET' });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    'delete_lead',
    'Delete a lead permanently',
    {
      business_id: z.string().describe('The business ID'),
      lead_id: z.string().describe('The lead ID'),
    },
    async ({ business_id, lead_id }) => {
      const result = await api.request(`/businesses/${business_id}/leads/${lead_id}`, { method: 'DELETE' });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );
}
