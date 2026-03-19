import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SignalsAPI } from '../api.js';

const icpSchema = z.object({
  target_locations: z.array(z.string()).optional().describe('Target geographic locations'),
  target_industries: z.array(z.string()).optional().describe('Target industries'),
  company_types: z.array(z.string()).optional().describe('Company types (e.g. "B2B SaaS", "E-commerce")'),
  company_sizes: z.array(z.string()).optional().describe('Company sizes (e.g. "1-10", "11-50")'),
  description: z.string().optional().describe('Free-text ICP description'),
}).describe('Ideal Customer Profile attributes');

export function registerBusinessTools(server: McpServer, api: SignalsAPI) {
  server.tool(
    'list_businesses',
    'List all businesses belonging to your team',
    {},
    async () => {
      const result = await api.request('/businesses', { method: 'GET' });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    'get_business',
    'Get details of a specific business including its ICP',
    { business_id: z.string().describe('The business ID') },
    async ({ business_id }) => {
      const result = await api.request(`/businesses/${business_id}`, { method: 'GET' });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    'create_business',
    'Create a new business. Provide a website URL for auto-analysis, or supply name/description/ICP manually.',
    {
      website: z.string().optional().describe('Website URL — triggers AI auto-analysis of the business'),
      name: z.string().optional().describe('Business name (for manual creation)'),
      description: z.string().optional().describe('Business description'),
      ideal_customer_profile_attributes: icpSchema.optional(),
    },
    async (params) => {
      const result = await api.request('/businesses', {
        method: 'POST',
        body: JSON.stringify(params),
      });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    'update_business',
    'Update an existing business and/or its ICP',
    {
      business_id: z.string().describe('The business ID'),
      name: z.string().optional().describe('New business name'),
      website: z.string().optional().describe('New website URL'),
      description: z.string().optional().describe('New business description'),
      ideal_customer_profile_attributes: icpSchema.optional(),
    },
    async ({ business_id, ...data }) => {
      const result = await api.request(`/businesses/${business_id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );
}
