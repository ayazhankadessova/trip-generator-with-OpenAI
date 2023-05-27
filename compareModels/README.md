## GPT MODELs

text-davinci-003 [supports completion, faster]
text-curie-001
text-babbage-001
text-ada-001

### How to choose a model?

Start with the best available model
Downgrade to save time & costs where u can

#### Prompt Compare Tool: https://gpttools.com/comparisontool

### Takeaway:

1. Newer models : more text, but slower
2. Older models: less text, but faster

### PlayGround: Experiment with temperature/frequency/stop settings; https://platform.openai.com/playground?lang=node.js

### Tokens/Maximum

1. Each token is a chunk of text
2. 100 tokens ~ 75 words
3. If you don't allow enough tokens, your completion will be cut short.

- `finish_reason: "length"` => bad
- `finish_reason: "stop"` => good

4. default : 16

#### Why are tokens important?

1. Each token -> charge & processing time => Limit no of tokens to keep costs down & performance up.
2. `max_tokens` does not help contril the consiceness of text => set it high enough to allow a full response => experiment!
3. Good prompt design!

### Write better prompts

- Zero shot Approach

1. Just an instruction
2. Fine for many simple instructions

- Few shot Approach [ with examples ]

1. Add one or more examples
2. Helps the AI understand what you want
3. Great for more complex tasks

- Add `###` when u are giving diff entities, such as:

`
_instructions_

###

_Example_

###

_template_

`
