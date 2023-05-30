import { Configuration, OpenAIApi } from 'openai'
import { process } from './env'

var waitMessageCont = document.getElementById('wait-message')
var adInput = document.getElementById('form-input')

let inputArray = {}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

document.getElementById('submit-btn').addEventListener('click', () => {
  getInputValues()
  displayLoadingMessage()
  fetchAIReply()
  fetchResult()
})

/* Get User Preferences */
function getInputValues() {
  inputArray['travelBudget'] = document.getElementById('input-budget').value
  inputArray['travelDesc'] = document.getElementById('input-desc').value
  inputArray['travelPartner'] = document.getElementById('travel-partner').value
  inputArray['travelType'] = document.getElementById('travel-type').value
  inputArray['travelArea'] = document.getElementById('travel-area').value
  inputArray['travelDays'] = document.getElementById('travel-days').value
}

/* Display Loading... */
function displayLoadingMessage() {
  adInput.innerHTML = `
    <img src="images/loading.svg" class="loading" id="loading">
    <h3 id="digest">Sure, please wait for a brief moment as my digital intelligence processes the information...</h3>
  `
}

/* Generate Personalized wait message */
async function fetchAIReply() {
  const prompt = `Generate a short message to enthusiastically preferences sound like a good and interesting plan and that you need some minutes to think about it.
  ###
  Preferences: 12,000 HKD; beach holiday; family-friendly, Europe
  message: Wow, a beach holiday in Europe sounds like a fantastic idea! With a budget of 12,000 HKD and a preference for a family-friendly trip, you're in for a great time. Let me take a few seconds to come up with a plan that suits your preferences. Stay tuned!
  ###
  Preferences: ${inputArray['travelBudget']}; ${inputArray['travelPartner']}; ${inputArray['travelArea']}; ${inputArray['travelType']}
  message:
  `
  const waitMessage = await generateCompletion(prompt, 70)
  document.getElementById('form-input').style.display = 'none'
  waitMessageCont.textContent = waitMessage
  document.getElementById('wait-container').style.display = 'flex'
}

/* Generate travel destination*/
async function fetchResult() {
  const destinationIdeaPrompt = `Give me a travel destination idea based on the budget and preferences of the user, no description needed, just destination.
  ###
  Type: beach holiday
  Budget: 12,000 HKD
  Preferences: family-friendly, Europe
  Days: 7
  Destination Idea: Algarve, Portugal.
  ###
  Type: ${inputArray['travelType']}
  Budget: ${inputArray['travelBudget']}
  Preferences: ${inputArray['travelPartner']}; ${inputArray['travelArea']}
  Days: ${inputArray['travelDays']}
  Destination Idea:
  `
  const destinationIdea = await generateCompletion(destinationIdeaPrompt, 50)
  document.getElementById('output-title').innerText = destinationIdea
  await fetchActivities(destinationIdea)
  await fetchSummary(destinationIdea)
}

/* Generate Activities for given number of days & preferences */
async function fetchActivities(destinationIdea) {
  const activitiesPrompt = `Give me a travel idea plan for ${destinationIdea} based on the budget and preferences of the user. Write every day on the new line with a dash in front of it. Add '\n' after every day.
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
  Budget: ${inputArray['travelBudget']}
  Preferences: ${inputArray['travelPartner']}; ${inputArray['travelArea']}
  Days: ${inputArray['travelDays']}
  Destination Idea: ${destinationIdea}
  Activities for 7 days:
  `
  const activitiesResponse = await generateCompletion(activitiesPrompt, 700)
  const days = activitiesResponse.split(/(?=- Day)/)
  // Display as a list
  const listItems = days.map((day) => {
    const cleanedDay = day.replace('-', '').trim()
    return `<SPAN class=li>${cleanedDay}</SPAN>`
  })
  const listText = listItems.join('')
  const outputBox = document.getElementById('output-text')
  outputBox.innerHTML = listText
}

/* Write summary for the destination */
async function fetchSummary(destinationIdea) {
  const summaryPrompt = `Describe travel destination in one sentence without mentioning the destination itself. People will have to guess it based on your description.
  ###
  Destination Idea: 
  Summary in one sentence: A scenic haven blending Alpine splendor and warm Swiss hospitality.
  ### 
  Destination Idea: ${destinationIdea}
  Summary in one sentence:
  `
  const summary = await generateCompletion(summaryPrompt, 50)
  document.getElementById('output-summary').innerText = summary
  generateImage(destinationIdea, summary)
}

/* generate small image*/
async function generateImage(destinationIdea, summary) {
  const prompt = `${destinationIdea}. ${summary}. There should be no text in this image.`
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: '256x256',
    response_format: 'url',
  })
  document.getElementById(
    'output-img-container'
  ).innerHTML = `<img src="${response.data.data[0].url}">`
  document.getElementById(
    'wait-container'
  ).innerHTML = `<button id="view-pitch-btn" class="view-pitch-btn">View Pitch</button>`
  document.getElementById('view-pitch-btn').addEventListener('click', () => {
    document.getElementById('wait-container').style.display = 'none'
    document.getElementById('output-container').style.display = 'flex'
  })
}

/* Generalized generate completion
Inputs: prompt & number of tokens. You can also play around different models/temperature */
async function generateCompletion(prompt, tokens) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `My prompt is${prompt} .`,
    temperature: 0.9,
    max_tokens: tokens,
    top_p: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  return response.data.choices[0].text.trim()
}

/*reload*/
document.getElementById('more-btn').addEventListener('click', function () {
  location.reload()
})
