const setupTextarea = document.getElementById('setup-textarea')
const setupInputContainer = document.getElementById('setup-input-container')
const businessBossText = document.getElementById('business-boss-text')

document.getElementById('send-btn').addEventListener('click', () => {
  //   if (setupTextarea.value) {
  setupInputContainer.innerHTML = `<img src="images/loading_TODO.svg" class="loading" id="loading">`
  businessBossText.innerText = `wait for AI result...`
  //   }

  fetchAIreply()
})

function fetchAIreply() {
  /*
TODO:
  1. Make a fetch request to OpenAi API. 
  2. The prompt should request an enthusiastic response
     in no more than 5 words. 
  3. For now you can just log out the completion to check 
     it's working. 
*/
}

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
    model: 'text-davinci-003',
    prompt: 'What is the best business idea?',
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
