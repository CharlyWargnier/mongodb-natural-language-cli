const { OpenAI } = require('openai');
require('dotenv').config();
const readline = require('readline');

// OpenAI configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your-api-key-here') {
  console.error('❌ OpenAI API key not found in environment variables');
  console.error('Please set your OPENAI_API_KEY in the .env file');
  process.exit(1);
}

const openaiClient = new OpenAI({ apiKey: OPENAI_API_KEY });

console.log('✅ OpenAI client configured');

// Generate MongoDB query from natural language
async function generateMongoDBQuery(userQuery) {
  const systemMessage = `
    You are a MongoDB query generator. Convert natural language questions into MongoDB queries.

    Instructions:
    - Return valid MongoDB query in JSON format that can be executed
    - Your response MUST include: 'database', 'collection', and 'operation' fields
    - Always set 'operation' to one of: 'find', 'count', 'aggregate', or 'listCollections'
    - For listing collections or databases, use 'listCollections' operation
    - For find operations, limit to 10 results by default unless user specifies a different limit
    - For find operations, include 'query' object (can be empty {})
    - Always use 'sample_mflix' as the database unless explicitly specified otherwise
    - For questions about movies, use the 'movies' collection in 'sample_mflix' database
    - Do not include explanations, just the query object
    - Example for finding movies: { "database": "sample_mflix", "collection": "movies", "operation": "find", "query": {}, "limit": 10 }
  `;

  const response = await openaiClient.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userQuery }
    ],
    response_format: { type: "json_object" }
  });

  const parsedResponse = JSON.parse(response.choices[0].message.content);
  return parsedResponse;
}

// CLI interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  console.log('\nMongoDB Natural Language Query Interface (via MCP)');
  console.log('--------------------------------------------------');

  const askQuestion = () => {
    rl.question('\nEnter your MongoDB question (or "exit" to quit): ', async (userInput) => {
      if (userInput.toLowerCase() === 'exit') {
        rl.close();
        return;
      }

      try {
        console.log('\nGenerating MongoDB query...');
        const queryObject = await generateMongoDBQuery(userInput);
        console.log('\nGenerated MongoDB Query:');
        console.log(JSON.stringify(queryObject, null, 2));
        console.log('\nNote: This query is meant to be executed by your MCP agent (e.g., Windsurf).');
      } catch (error) {
        console.error('Error:', error);
      }

      askQuestion();
    });
  };

  askQuestion();
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});