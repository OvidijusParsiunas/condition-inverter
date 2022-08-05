<div align="center">
    <a href="https://vsmarketplacebadge.apphb.com/version/ovidijusparsiunas.condition-inverter.svg">
        <img style="margin-left: -14px" src="https://vsmarketplacebadge.apphb.com/version/ovidijusparsiunas.condition-inverter.svg" alt="Build status">
    </a><a href="https://img.shields.io/github/workflow/status/OvidijusParsiunas/condition-inverter/push%20to%20main%20branch">
        <img src="https://img.shields.io/github/workflow/status/OvidijusParsiunas/condition-inverter/push%20to%20main%20branch" alt="Build status">
    </a><a href="https://img.shields.io/codecov/c/github/OvidijusParsiunas/condition-inverter">
        <img src="https://img.shields.io/codecov/c/github/OvidijusParsiunas/condition-inverter" alt="Build status">
    </a><a href="https://img.shields.io/testspace/tests/ovidijusparsiunas/ovidijusparsiunas:condition-inverter/main">
        <img src="https://img.shields.io/testspace/tests/ovidijusparsiunas/ovidijusparsiunas:condition-inverter/main" alt="Build status">
    </a>
</div>

# Condition Inverter

Invert conditions for all modern programming languages and frameworks!

[VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=OvidijusParsiunas.condition-inverter)

## Features
Highlight conditions that you want to invert:

<p align="center">
    <img width="850" src="../assets/readme/gifs/extension-animation.gif" alt="Logo">
</p>

Invert conditions inside html templates:
<p align="center">
    <img width="850" src="../assets/readme/gifs/extension-animation.gif" alt="Logo">
</p>

Invert conditions for ternary operators, for loops, and more:
<p align="center">
    <img width="850" src="../assets/readme/gifs/extension-animation.gif" alt="Logo">
</p>

## How to use

Highlight the area of code that you want to be inverted and press the following key combination on your keyboard:

| Operating System | Keys |
| :---  | :---  |
| Windows/Ubuntu | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>i</kbd> |
| Mac | <kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>i</kbd>  |

You can alternatively rebind the key combination to your preference by searching for the following command inside the VSCode's *Keyboard Shortcuts* section: `condition-inverter.invert`.


## Theory
This tool has been designed to take an input condition, analyze it and produce a new condition that would yield an absolute opposite result. This is illustrated by the following table:

| Properties | Original condition | Result | Inverted condition | Result |
| :---  | :---  | :---- | :---- | :---- |
| dog = true, cat = false | dog && cat | false  | !dog &#124; &#124; !cat | true |
| dog = 3, cat = 2 | dog < cat  | false |  dog >= cat | true |

## Language Support
Condition Inverter supports all *modern* progrogramming languages and frameworks. This includes technologies that have been ranked as the most popular on the [Stack Overflow Developer Survey](https://survey.stackoverflow.co/2022/#technology-most-popular-technologies). <br>
As a disclaimer this tool does not currently support query, shell scripting or assembly based languages.

## Local setup
```
# Requirements: Node version 11+ and NPM version 6+

# Install node dependencies:
$ npm install

# Compile dependencies and run the project in watch mode:
$ npm run compile:watch

# To run tests
# Navigate to the ../shared directory and install its node dependencies:
$ npm install

# Navigate back to the ./extension directory and run tests:
$ npm run test

# Run tests with coverage:
$ npm run test:coverage
```

## Contributions

Open source is built by the community for the community. All contributions to this project are welcome!
<br> Additionally, if you have any suggestions for enhancements, ideas on how to take the project further or have discovered a bug, do not hesitate to create a new issue ticket and we will look into it as soon as possible!
