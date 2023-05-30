import { process } from '/env.js'
import { Configuration, OpenAIApi } from 'openai'

const setupInputContainer = document.getElementById('setup-input-container')
const businessBossText = document.getElementById('business-boss-text')
const outputBox = document.getElementById('output-text')
const outputImage = document.getElementById('output-img-container')

let inputArray = {}
inputArray['travelType'] = 'adventure'
inputArray['travelPartner'] = 'friends-friendly'
inputArray['budget'] = '30,000 HKD'
inputArray['area'] = 'Europe'
inputArray['days'] = '7'

/* API vars*/
// const fetch = require('node-fetch')
// const apiKey = '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'

/* Using OpenAI Dependency */
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

document.getElementById('send-btn').addEventListener('click', () => {
  const setupTextarea = document.getElementById('setup-textarea')

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
  /*
1. Use examples of preferences and an 
   enthusiastic response. Be sure to keep the length of your 
   examples reasonably short, say 20 words or so.
*/

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate a short message to enthusiastically preferences sound like a good and interesting plan and that you need some minutes to think about it. 
    
    ###
    Preferences: 12,000 HKD; beach holiday; family-friendly, Europe
    message: Wow, a beach holiday in Europe sounds like a fantastic idea! With a budget of 12,000 HKD and a preference for a family-friendly trip, you're in for a great time. Let me take a few seconds to come up with a plan that suits your preferences. Stay tuned!
    ###
    Preferences: ${inputArray['budget']}; ${inputArray['travelPartner']}; ${inputArray['area']}; ${inputArray['travelType']}
    message:
    `,
    temperature: 1,
    max_tokens: 70,
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
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Give me a travel destination idea based on the budget and preferences of the user, no description needed, just destination.
    
    ###
    Type: beach holiday
    Budget: 12,000 HKD
    Preferences: family-friendly, Europe
    Days: 7
    Destination Idea: Algarve, Portugal.
    ###
    Type: ${inputArray['travelType']}
    Budget: ${inputArray['budget']}
    Preferences: ${inputArray['travelPartner']}; ${inputArray['area']}
    Days: ${inputArray['days']}
    Destination Idea:
    `,
    temperature: 0.9,
    max_tokens: 100,
    top_p: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  console.log(response)
  const destinationIdea = response.data.choices[0].text.trim()
  document.getElementById('output-title').innerText = destinationIdea
  fetchActivities(destinationIdea)
  fetchSummary(destinationIdea)
}

async function fetchActivities(destinationIdea) {
  let response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Give me a travel idea plan for ${destinationIdea} based on the budget and preferences of the user. Write every day on the new line with a dash in front of it. Add '\n' after every day.
    
    ###
    Type: beach holiday
    Budget: 12,000 HKD
    Preferences: family-friendly, Europe
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
    Type: ${inputArray['travelType']}
    Budget: ${inputArray['budget']}
    Preferences: ${inputArray['travelPartner']}; ${inputArray['area']}
    Days: ${inputArray['days']}
    Destination Idea: ${destinationIdea}
    Activities for 7 days:
    `,
    temperature: 0.9,
    max_tokens: 700,
    top_p: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  let daysOrig = response.data.choices[0].text.trim()
  const days = daysOrig.split(/(?=- Day)/)
  console.log(days)

  // display as list
  const listItems = days.map((day) => {
    const cleanedDay = day.replace('-', '').trim()
    return `<SPAN class=li>${cleanedDay}</SPAN>`
  })

  const htmlText = listItems.join('')
  outputBox.innerHTML = htmlText
}

async function fetchSummary(destinationIdea) {
  let response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Describe travel destination in one sentence without mentioning the destination itself. People will have to guess it based on your description. 
    
    ###
    Destination Idea: 
    Summary in one sentence: A scenic haven blending Alpine splendor and warm Swiss hospitality.
    
    ### 
    Destination Idea: ${destinationIdea}
    Summary in one sentence: `,
    temperature: 0.9,
    max_tokens: 50,
    top_p: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  const summary = response.data.choices[0].text.trim()
  document.getElementById('output-stars').innerText = summary

  generateImage(destinationIdea, summary)
}

async function generateImage(destinationIdea, summary) {

  const response = await openai.createImage({
    prompt: `${destinationIdea}. ${summary}. There should be no text in this image.`,
    n: 1,
    size: '256x256',
    response_format: 'url',
  })
  document.getElementById(
    'output-img-container'
  ).innerHTML = `<img src="${response.data.data[0].url}">`

  setupInputContainer.innerHTML = `<button id="view-pitch-btn" class="view-pitch-btn">View Pitch</button>`
  document.getElementById('view-pitch-btn').addEventListener('click', () => {
    document.getElementById('setup-container').style.display = 'none'
    document.getElementById('output-container').style.display = 'flex'
    businessBossText.innerText =
      'If you like the generated idea, star the repo :)'
  })
}
