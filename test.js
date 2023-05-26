/* API vars*/
const fetch = require('node-fetch')
const apiKey = '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'
const url = 'https://api.openai.com/v1/completions'

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    prompt: 'Give me and enthusiastic response in no more than 5 words.',
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
