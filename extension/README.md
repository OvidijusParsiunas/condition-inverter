#If Inverter

<div align="center">
    <a href="https://img.shields.io/github/workflow/status/OvidijusParsiunas/if-inverter/push%20to%20main%20branch">
        <img style="margin-left: -84px" src="https://img.shields.io/github/workflow/status/OvidijusParsiunas/if-inverter/push%20to%20main%20branch" alt="Build status">
    </a><a href="https://img.shields.io/codecov/c/github/OvidijusParsiunas/if-inverter">
        <img src="https://img.shields.io/codecov/c/github/OvidijusParsiunas/if-inverter" alt="Build status">
    </a><a href="https://img.shields.io/testspace/tests/ovidijusparsiunas/ovidijusparsiunas:if-inverter/main">
        <img src="https://img.shields.io/testspace/tests/ovidijusparsiunas/ovidijusparsiunas:if-inverter/main" alt="Build status">
    </a>
</div>

A simple tool used to invert if statements for all programming languages.

[insert gif here]

[VS Code Marketplace](https://github.com/OvidijusParsiunas/if-inverter/tree/main/website)

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

# Run the project in watch mode:
$ npm run compile:watch

# To run tests
# Navigate to the ../shared directory and install shared node dependencies:
$ npm install

# Navigate back to the ./extension directory and run tests:
$ npm run test

# Run tests with coverage:
$ npm run test:coverage
```

## Contributions

Open source is built by the community for the community. All contributions to this project are welcome!
<br> Additionally, if you have any suggestions for enhancements, ideas on how to take the project further or have discovered a bug, do not hesitate to create a new ticket and we will look into it as soon as possible!
