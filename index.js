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
  if (setupTextarea.value) {
    const userInput = setupTextarea.value
    setupInputContainer.innerHTML = `<img src="images/bookSuggest.png" class="loading" id="loading">`
    businessBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
    fetchAIreply(userInput)
  }
})

/*
TODO:
    1. Make a fetch request to OpenAi API.
    2. The prompt should request an enthusiastic response
        in no more than 5 words.
    3. For now you can just log out the completion to check
        it's working.

    ----------------
    1. Refactor this prompt so the AI gives an enthusiastic, personalised 
        response to the users input and says it needs a few moments to think.
*/
async function fetchAIreply(userInput) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Give me an enthusiastic reply about ${userInput}`,
    temperature: 1,
    max_tokens: 60,
    top_p: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  console.log(response)
  businessBossText.innerText = response.data.choices[0].text.trim()
}

/* check what result we are getting and modifing it */
async function fetchResult(userInput) {}
