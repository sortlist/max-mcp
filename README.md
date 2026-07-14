# Max MCP Server

[![npm](https://img.shields.io/npm/v/sortlist-max-mcp)](https://www.npmjs.com/package/sortlist-max-mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](LICENSE)

**MCP server for the [Max](https://yourmax.ai/) lead intelligence API** — gives AI agents tools to discover leads, manage subscriptions, and automate sales workflows.

---

## Quick Setup

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "signals": {
      "command": "npx",
      "args": ["-y", "sortlist-max-mcp"],
      "env": {
        "MAX_API_KEY": "your_api_key"
      }
    }
  }
}
```

### Cursor

Add to your Cursor MCP settings (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "signals": {
      "command": "npx",
      "args": ["-y", "sortlist-max-mcp"],
      "env": {
        "MAX_API_KEY": "your_api_key"
      }
    }
  }
}
```

### Claude Code

```bash
claude mcp add signals -- npx -y sortlist-max-mcp -e MAX_API_KEY=your_api_key
```

> Get your API key from **Settings > API Keys** in your [Max dashboard](https://yourmax.ai/).

### For AI Agents

Install the Max skill for your AI agent (Cursor, Claude Code, OpenClaw, etc.):

```bash
npx skills add sortlist/max-cli
```

This installs a [SKILL.md](https://github.com/sortlist/max-cli/blob/main/SKILL.md) that gives your agent full knowledge of the CLI commands, patterns, and workflows.

---

## Tools

The server exposes 19 tools covering the full Max API:

### Signals (catalog)

| Tool | Description |
|---|---|
| `list_signals` | List all available signal types |
| `get_signal` | Get details of a specific signal by slug |

### Businesses

| Tool | Description |
|---|---|
| `list_businesses` | List all businesses in your team |
| `get_business` | Get a business with its Ideal Customer Profile |
| `create_business` | Create a business (auto-analyze from URL or manual) |
| `update_business` | Update a business and/or its ICP |

### Subscriptions

| Tool | Description |
|---|---|
| `list_subscriptions` | List subscriptions for a business |
| `get_subscription` | Get subscription details and stats |
| `create_subscription` | Subscribe to a signal for a business |
| `update_subscription` | Update subscription name or config |
| `pause_subscription` | Pause lead collection |
| `resume_subscription` | Resume a paused subscription |
| `delete_subscription` | Delete a subscription permanently |

### Leads

| Tool | Description |
|---|---|
| `list_leads` | List leads for a business (paginated) |
| `get_lead` | Get full lead details |
| `delete_lead` | Delete a lead |

### Webhooks

| Tool | Description |
|---|---|
| `list_webhooks` | List webhook endpoints |
| `create_webhook` | Register a webhook URL |
| `delete_webhook` | Remove a webhook endpoint |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MAX_API_KEY` | Yes | Your Max API key |
| `MAX_API_URL` | No | Override the API base URL (defaults to `https://api.yourmax.ai`) |

---

## Development

```bash
git clone https://github.com/sortlist/max-mcp.git
cd max-mcp
npm install
npm run dev    # Watch mode
npm run build  # Production build
```

### Project Structure

```
src/
  index.ts          # MCP server entry point (stdio transport)
  api.ts            # ApiClient HTTP client
  tools/
    signals.ts      # list_signals, get_signal
    businesses.ts   # Business CRUD + ICP management
    subscriptions.ts # Subscription lifecycle
    leads.ts        # Lead retrieval and deletion
    webhooks.ts     # Webhook management
```

---

## Links

- **Website:** [yourmax.ai](https://yourmax.ai/)
- **API Docs:** [yourmax.ai/docs/api](https://yourmax.ai/docs/api)
- **CLI:** [sortlist-max-cli](https://www.npmjs.com/package/sortlist-max-cli)
- **GitHub:** [sortlist/max-mcp](https://github.com/sortlist/max-mcp)

---

## License

MIT
