Using Open AI API
Models
Tokens
prompts
examples to train Modelsextract info from texts
generate images with words

1. Listen to clicks
2. If there is any text, generate a result.
3. If there is no text, do notghing

## StackOverFlow

Node.js

Alternatively, if you demand a more responsive setup and already use nodejs...

Install http-server by typing npm install -g http-server
Change into your working directory, where yoursome.html lives
Start your http server by issuing http-server -c-1
This spins up a Node.js httpd which serves the files in your directory as static files accessible from http://localhost:8080

## Improve: Use OpenAI Dependency instead of fetch

```
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const response = await openai.createCompletion({
  model: 'text-davinci-003',
  prompt:
    'Suggest me a book about feminism, non-fiction, not old.\n\n1. Feminism Is For Everybody: Passionate Politics by Bell Hooks \n2. Badass Feminists: Everyday Revolutionaries Creating Change from the Ground Up edited by Becca and Savanna Leanna\n3. We Should',
  temperature: 1,
  max_tokens: 48,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
})

```

## Improve: use env variables

### Next: work on reuability
