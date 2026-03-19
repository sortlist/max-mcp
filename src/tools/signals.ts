import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SignalsAPI } from '../api.js';

export function registerSignalTools(server: McpServer, api: SignalsAPI) {
  server.tool(
    'list_signals',
    'List all available signals in the catalog',
    {},
    async () => {
      const result = await api.request('/signals', { method: 'GET' });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    'get_signal',
    'Get details of a specific signal by its slug',
    { slug: z.string().describe('The signal slug (e.g. "new-hire")') },
    async ({ slug }) => {
      const result = await api.request(`/signals/${encodeURIComponent(slug)}`, { method: 'GET' });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );
}
