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
