import { process } from '/env.js'
import { Configuration, OpenAIApi } from 'openai'

const setupTextarea = document.getElementById('setup-textarea')
const setupInputContainer = document.getElementById('setup-input-container')
const businessBossText = document.getElementById('business-boss-text')
const outputBox = document.getElementById('output-text')

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
    fetchResult(userInput)
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

/* TODO 

  1. Set up an API call with model, prompt, and max_tokens properties.
  2. The prompt should ask for a synopsis for a movie based on the 
    outline supplied by the user.

    */
async function fetchResult(userInput) {
  let travelPartner = 'friends-friendly'
  let budget = '30,000 HKD'
  //   let area = 'Europe'
  let days = '7'

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Give me a travel idea plan based on the budget and preferences of the user.
    
    ###
    Budget: 12,000 HKD
    Preferences: beach holiday; family-friendly, Europe
    Days: 7
    Destination Idea: Algarve, Portugal.
    Activities for 7 days: 
    - Day 1: Fly to Faro, Algarve with budget airlines or discounted flights.\n
    - Day 2: Stay in family-friendly resorts or apartments near the beach in Albufeira or Lagos.\n
    - Day 3: Explore stunning beaches like Praia da Marinha and Praia da Rocha.\n
    - Day 4; Visit water parks like Slide & Splash and Aqualand Algarve for a fun day.\n
    - Day 5: Take boat trips to explore hidden caves and enjoy dolphin watching.\n
    - Day 6: Discover historic towns like Faro, Lagos, and Tavira for cultural excursions\n
    - Day 7: Consider dining at local eateries and trying street food to save on expenses.\n
    ###
    Budget: ${budget}
    Preferences: ${travelPartner}; ${userInput}
    Days: ${days}
    Destination Idea and Activities for ${days} days:
    `,
    temperature: 1,
    max_tokens: 700,
    top_p: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  console.log(response)
  outputBox.innerHTML = response.data.choices[0].text.trim()
}
