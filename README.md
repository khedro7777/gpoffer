GPOFFER HUB

This project is a Group Offer Platform built with:

- Vite + React
- Tailwind CSS
- Node.js

Project Structure:

gpo-platform/
├── backend/ (Node.js APIs)
│   ├── offer.controller.js
│   ├── auth.controller.js
│   ├── admin.controller.js
│   ├── kyc.controller.js
│   ├── mail.controller.js
│   ├── offer.model.js
│   ├── routes.js
│   └── db.js
├── frontend/ (Vite + React + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   │   ├── offer/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   └── shared/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── OfferDetails.jsx
│   │   │   ├── SupplierPanel.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── tailwind.config.js
├── public/
├── package.json
└── README.md




## MCP-Based Invitation System Setup

This project integrates with a DeepSeek MCP Server for AI-powered supplier invitation logic. To set up the MCP server, follow the instructions below.

### Manual Installation of DeepSeek MCP Server

1.  **Clone the repository:**
    ```shell
    git clone https://github.com/DMontgomery40/deepseek-mcp-server.git
    cd deepseek-mcp-server
    ```
2.  **Install dependencies:**
    ```shell
    npm install
    ```
3.  **Build the server:**
    ```shell
    npm run build
    ```
4.  **Run the server (for testing with MCP Inspector):**
    ```shell
    npx @modelcontextprotocol/inspector node ./build/index.js
    ```

### Usage with Claude Desktop (Example Configuration)

Add this to your `claude_desktop_config.json` (or similar configuration for your MCP-compatible application):

```json
{
  "mcpServers": {
    "deepseek": {
      "command": "npx",
      "args": [
        "-y",
        "deepseek-mcp-server"
      ],
      "env": {
        "DEEPSEEK_API_KEY": "your-api-key"
      }
    }
  }
}
```

**Note:** Replace `"your-api-key"` with your actual DeepSeek API key.


For more details, refer to the [DeepSeek MCP Server GitHub repository](https://github.com/DMontgomery40/deepseek-mcp-server).


