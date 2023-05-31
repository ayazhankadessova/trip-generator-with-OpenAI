# Travel Destination Generator - Vite & OPENAI

## Tech Stack

**Client:** Javascript, HTML, CSS, OPENAI, Vite

### Links & Demo

<p align="center">
<img src="https://github.com/ayazhankadessova/trip-generator-OpenAI/assets/86869537/8a93377f-859c-42be-b39e-3b13304e062f" width="800" alt="trip-generator-inf">
</p>

- [Github Repo](https://github.com/ayazhankadessova/trip-generator-with-OpenAI)

## Run Locally

1. Clone the project

```bash
  git clone https://github.com/ayazhankadessova/trip-generator-OpenAI.git
```

2. Go to the project directory

```bash
  cd ..trip-generator-OpenAI
```

3. Install dependencies

```bash
npm install
```

4. Get & insert Api key

I [cleaned my api key](https://til.simonwillison.net/git/rewrite-repo-remove-secrets), so you will have to **use your own.**

### How to generate OpenAI Api Key?

1. Go to OpenAI's Platform website at [platform.openai.com](https://platform.openai.com) and sign in with an OpenAI account.
2. Click your profile icon at the top-right corner of the page and select ["View API Keys."](https://platform.openai.com/account/api-keys)
3. Click "Create New Secret Key" to generate a new API key -> copy it
4. Create `env.js` inside the project repository and copy and paste this, adding your api key.

```
export const process = {
  env: {
    OPENAI_API_KEY: 'YOUR API KEY',
  },
}
```

5. Start the app

```bash
npm run dev
```

## Overview

- OpenAIApi
- Dall-E
- import.meta.env
- openai.createCompletion
- openai.createImage
- text-davinci-003

## Author

- [@ayazhankadessova](https://github.com/ayazhankadessova)
- [Linkedin](https://www.linkedin.com/in/ayazhankad/)

## About Me

I'm aspiring software developer from Kazakhstn, studying in Hong Kong.

👩‍💻 I'm currently improving my skills in React.js :)

## What I learned:

1. Used the OpenAI API

- text-davinci-003 model
- creatCompletions endpoint

2. Zero shot approach -> Few shot

- max_tokens
- temperature

3. Goals:

- Make better frontend

4. Tools:

- Gif creator: https://www.cockos.com/licecap/
