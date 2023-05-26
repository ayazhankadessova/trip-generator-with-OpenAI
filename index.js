import { process } from '/env.js'
import { Configuration, OpenAIApi } from 'openai'

const setupTextarea = document.getElementById('setup-textarea')
const setupInputContainer = document.getElementById('setup-input-container')
const businessBossText = document.getElementById('business-boss-text')

/* API vars*/
// const fetch = require('node-fetch')
// const apiKey = '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'

/* Using OpenAI Dependency */
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

document.getElementById('send-btn').addEventListener('click', () => {
  //   if (setupTextarea.value) {
  //   setupInputContainer.innerHTML = `<img src="images/loading_TODO.svg" class="loading" id="loading">`
  //   businessBossText.innerText = data
  //   }

  fetchAIreply()
})

/*
TODO:
  1. Make a fetch request to OpenAi API.
  2. The prompt should request an enthusiastic response
     in no more than 5 words.
  3. For now you can just log out the completion to check
     it's working.
*/
async function fetchAIreply() {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Suggest me a book about feminism, non-fiction, not old.\n',
    temperature: 1,
    max_tokens: 25,
    top_p: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  console.log(response)
  businessBossText.innerText = response.data.choices[0].text.trim()
}
