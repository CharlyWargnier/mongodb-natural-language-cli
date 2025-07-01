# 🧠 MongoDB Natural Language CLI

A lightweight CLI demo showing how to use the [MongoDB MCP Server](https://fnf.dev/4jDW43H) to query your MongoDB database using natural language — the same mechanism used by MCP-compatible IDEs like Windsurf, Cursor, or Claude Desktop.

📌 Created by [Charly Wargnier](https://x.com/DataChaz) · [View the tutorial thread on X]([https://x.com/your-thread-placeholder](https://x.com/DataChaz/status/1940052495939903598))

---

## 📦 How it works

- The CLI uses OpenAI to convert natural language into MongoDB queries.
- MongoDB access is delegated via the [`mongodb-mcp-server`](https://www.npmjs.com/package/mongodb-mcp-server), defined in a `mcp.config.json` file.
- Only the **OpenAI API key** is required in `.env`.
- The MCP server handles execution of the queries against your MongoDB cluster.

---

## ⚙️ Requirements

- Node.js ≥ 18
- [`mongodb-mcp-server`](https://www.npmjs.com/package/mongodb-mcp-server) (handled automatically via `npx`)
- A valid OpenAI API key (for generating queries)
- A MongoDB Atlas cluster (or local MongoDB instance)

---

## 🛠 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mongodb-natural-language-cli
cd mongodb-natural-language-cli
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your `.env` file

Copy the example file:

```bash
cp .env.example .env
```

Then paste your OpenAI API key into `.env`:

```env
OPENAI_API_KEY=sk-your-api-key
```

---

## 🔗 MongoDB Configuration (via MCP)

Create a `mcp.config.json` file at the root of your project like this:

```json
{
  "mcpServers": {
    "MongoDB": {
      "command": "npx",
      "args": [
        "-y",
        "mongodb-mcp-server",
        "--connectionString",
        "mongodb+srv://<username>:${MDB_PASSWORD}@<your-cluster>.mongodb.net/?retryWrites=true&w=majority&appName=<your-app>"
      ],
      "env": {
        "MDB_PASSWORD": "YOUR_MDB_PASSWORD"
      }
    }
  }
}
```

### 📌 How to get your MongoDB connection string

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and log in.
2. Select your project and cluster.
3. Click **"Connect"** > **"Connect your application"**
4. Select:
   - Driver: Node.js
   - Version: 6.7 or later
5. Copy the connection string and plug it into the config above.

> 💡 Replace `<username>`, `<your-cluster>`, and `<your-app>` accordingly.  
> Use `${MDB_PASSWORD}` to reference a password defined in your environment (recommended).

---

## 🚀 Run the CLI

```bash
node mongodb_nlq.js
```

You’ll be prompted to enter a natural language query like:

```
Enter your MongoDB question (or "exit" to quit): Find the 5 most recent movies
```

And the CLI will output a structured MongoDB query (to be executed by your MCP agent).

---

## 🧠 Example queries

- `List all collections`
- `Find the 10 most active users`
- `Count documents in the orders collection`
- `Find 5 comedy movies`
- `Show me all databases`

---

## 🔐 Security Reminder

> ✅ Keep your `.env`, `mcp.config.json`, and any secrets out of your version control  
> ❌ Never commit your real `OPENAI_API_KEY` or `MDB_PASSWORD`

---

## 🙋 Need help?

Open an issue or tag [@DataChaz](https://x.com/DataChaz) on X.
