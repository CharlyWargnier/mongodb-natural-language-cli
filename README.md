<div align="center">

# 🧠 MongoDB Natural Language Query Interface (powered by OpenAI)

A CLI tool to query your MongoDB database using natural language via OpenAI — created by [Charly Wargnier](https://www.linkedin.com/in/charlywargnier/).

🔗 [Follow me on Twitter/X](https://x.com/DataChaz)  
📌 [View the tutorial thread](https://x.com/your-thread-placeholder) <!-- Replace this when ready -->

</div>

## 📦 How it works

- MongoDB is accessed **via `mongodb-mcp-server`**, using your `mcp.config.json` file.
- Only the **OpenAI API key** is needed in your `.env` file.

---

## ⚙️ Requirements

- Node.js ≥ 18
- A working `mongodb-mcp-server` setup (see below)
- An [OpenAI API Key](https://platform.openai.com/account/api-keys)

---

## 🛠 Setup Instructions

### 1. Clone this repository

```bash
git clone https://github.com/your-username/mongo-openai-query
cd mongo-openai-query
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your `.env` file

Copy the `.env.example` file and add your OpenAI key:

```bash
cp .env.example .env
```

Edit it:

```env
OPENAI_API_KEY=sk-your-api-key-here
```

---

## 🔗 MongoDB Configuration (via MCP)

Your MongoDB connection is **handled externally** using [`mongodb-mcp-server`](https://www.npmjs.com/package/mongodb-mcp-server) and a configuration file like this:

```json
{
  "mcpServers": {
    "MongoDB": {
      "command": "npx",
      "args": [
        "-y",
        "mongodb-mcp-server",
        "--connectionString",
        "mongodb+srv://charlyw:${MDB_PASSWORD}@cluster1.perxs9f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
      ],
      "env": {
        "MDB_PASSWORD": "YOUR_MDB_PASSWORD"
      }
    }
  }
}
```

Make sure to:
- Set your real MongoDB password in your environment under `MDB_PASSWORD`
- Run the MCP server before launching the interface

---

## 🚀 Run the application

```bash
node mongo-openai-query.js
```

---

## 🧠 Example questions

- `List all collections`
- `How many documents are in the movies collection?`
- `Find 5 comedy movies`
- `Show me all databases`

---

## 🔐 Security Reminder

> ✅ Keep your `.env` and any secrets out of public repos  
> ❌ Do not commit your real `MDB_PASSWORD` or OpenAI key

---

## 🙋 Need help?

Open an issue or tag [@datachaz] on Twitter/X.

---

## ✅ Summary

| Feature | Where it's configured |
|--------|------------------------|
| MongoDB URI | `mcp.config.json` + `MDB_PASSWORD` |
| OpenAI key  | `.env` → `OPENAI_API_KEY` |
