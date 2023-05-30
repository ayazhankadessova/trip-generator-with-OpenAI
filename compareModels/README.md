## 🤩 Comparing GPT Models

1. text-davinci-003 [supports completion, faster]
2. text-curie-001
3. text-babbage-001
4. text-ada-001

### How to choose a model?

1. Start with the best available model
2. Downgrade to save time & costs where u can

**look at elapsed time**

<p align="center">
  <img src="Comparison_Book.png" width="500" title="Comparing DaVinci models">
</p>

#### Prompt Compare Tool: https://gpttools.com/comparisontool

<p align="center">
  <img src="Comparison002_003.png" width="500" title="Comparing DaVinci models">
</p>

### Takeaway:

1. Newer models : more text, but slower
2. Older models: less text, but faster

#### PlayGround: Experiment with temperature/frequency/stop settings; https://platform.openai.com/playground?lang=node.js

### Tokens/Maximum

1. Each token is a chunk of text
2. 100 tokens ~ 75 words
3. If you don't allow enough tokens, your completion will be cut short.

- `finish_reason: "length"` => bad
- `finish_reason: "stop"` => good

4. default : 16

### Why are tokens important?

1. Each token -> charge & processing time => Limit no of tokens to keep costs down & performance up.
2. `max_tokens` does not help contril the consiceness of text => set it high enough to allow a full response => experiment!
3. Good prompt design!

### H

1. Zero shot Approach

- Just an instruction
- Fine for many simple instructions

2. Few shot Approach [ with examples ]

- Add one or more examples
- Helps the AI understand what you want
- Great for more complex tasks

- Add `###` when u are giving diff entities, such as:

`
_instructions_

`###`

_Example_

`###`

_template_

`

### OpenAI Create Image

1. Size in pixels
2. Generated images can have a size of 256x256, 512x512, or 1024x1024 pixels. Smaller sizes are faster to generate. You can request 1-10 images at a time using the n parameter.
3. image urls last only for 1hours, so use b64_json [big chunk of code that browser can interpret as an image]
4. Be descriptive with prompt

```
const response = await openai.createImage({
  prompt: "a white siamese cat",
  n: 1,
  size: "1024x1024",
  response_format: "url"
});
image_url = response.data.data[0].url;
```
