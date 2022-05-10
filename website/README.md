#If Inverter

A simple tool used to invert if statements for all programming languages.

[insert gif here]

## Theory

This tool has been designed to directly invert the conditional syntax within an if statement for it to produce an absolute opposite result. This is illustrated by the following table:

Properties: dog = true, cat = false.

| Original if statement | Result | Inverted if statement | Result |
| :---  | :---- | :---- | :---- |
| if (dog) | true |  if (!dog) | false |
| if (dog && cat) | false  | if (!dog &#124; &#124; !cat) | true |
| if (dog &#124;&#124; cat) | true | if (!dog && !cat) | false |
| if (dog < cat) | false |  if (dog >= cat) | true |

Whilst the if statement inversion problem can be solved by simply wrapping the conditional logic between brackets and adding an exclamation mark in the front; such process would only add redundant complexity - lowering code cohesion and maintainability. Hence, to produce sound results and uphold code quality - this tool has been designed to invert specific areas of code that would yield maximum cohesion with minimal intrusion to its existing structure:

| Input | Naive result :ballot_box_with_check: | If Inverter result :white_check_mark: |
| :--- | :---- | :--- |
| if (!(dog)) | if (!(!(dog))) | if (dog) |
| if (true && 0) | if (!(true && 0)) | if (false &#124;&#124; 1) |
| if (((dog && cat))) | if (!((dog && cat))) | if (((!dog &#124;&#124; !cat))) |

## Local setup
```
# Requirements: Node version 11+ and NPM version 6+

# Install node dependencies:
$ npm install

# Compile dependency to the '../shared' directory:
$ npm run compile
# or watch for any further changes in that directory using the watch mode:
$ npm run compile:watch

# Run the website in watch mode:
$ npm run start
```

## Contributions

Open source is built by the community for the community. All contributions to this project are welcome!
<br> Additionally, if you have any suggestions for enhancements, ideas on how to take the project further or have discovered a bug, do not hesitate to create a new ticket and we will look into it as soon as possible!
