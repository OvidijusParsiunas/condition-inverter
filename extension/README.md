<p align="center"> 
    <img width="90%" src="https://raw.githubusercontent.com/OvidijusParsiunas/condition-inverter/main/assets/readme/png/banner/banner-12.png" alt="Banner">
</p>

<div align="center">
    <a href="https://marketplace.visualstudio.com/items?itemName=OvidijusParsiunas.condition-inverter">
        <img style="margin-left: -14px" src="https://img.shields.io/visual-studio-marketplace/v/OvidijusParsiunas.condition-inverter?color=-n" alt="Visual Studio Marketplace version">
    </a>
    <a href="https://img.shields.io/github/actions/workflow/status/OvidijusParsiunas/condition-inverter/push-to-main-branch.yml?branch=main">
        <img src="https://img.shields.io/github/actions/workflow/status/OvidijusParsiunas/condition-inverter/push-to-main-branch.yml?branch=main" alt="Build status">
    </a>
    <a href="https://app.codecov.io/gh/OvidijusParsiunas/condition-inverter">
        <img src="https://img.shields.io/codecov/c/github/OvidijusParsiunas/condition-inverter" alt="Code coverage">
    </a>
    <a href="https://ovidijusparsiunas.testspace.com/projects/66878/spaces">
        <img src="https://img.shields.io/testspace/tests/ovidijusparsiunas/ovidijusparsiunas:condition-inverter/main" alt="Number of tests that have passed">
    </a>
</div>

## Description

A simple tool used to invert conditions for all modern programming languages and frameworks!


## Features
Highlight conditions that you want to invert:

<p align="center">
    <img width="100%" src="https://raw.githubusercontent.com/OvidijusParsiunas/condition-inverter/main/assets/readme/gif/extension/editor/extension-editor-if-5.gif" alt="Extension-editor-if-animation">
</p>

Invert conditions in ternary operators, for loops, and more:
<p align="center">
    <img width="100%" src="https://raw.githubusercontent.com/OvidijusParsiunas/condition-inverter/main/assets/readme/gif/extension/editor/extension-editor-others-6.gif" alt="Extension-editor-others-animation">
</p>

Invert conditions inside html templates:
<p align="center">
    <img width="100%" src="https://raw.githubusercontent.com/OvidijusParsiunas/condition-inverter/main/assets/readme/gif/extension/editor/extension-editor-html-3.gif" alt="Extension-editor-html-animation">
</p>

## How to use

Highlight the area of code that you want to invert and press the following key combination on your keyboard:

| Operating System | Keys |
| :---  | :---  |
| Windows/Ubuntu | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>i</kbd> |
| Mac | <kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>i</kbd>  |

You can alternatively rebind the key combination to your preference by searching for the following command inside the VSCode's *Keyboard Shortcuts* section: `condition-inverter.invert`.


## Theory
This tool has been designed to take an input condition, analyze it and produce a new condition that would yield an absolute opposite result. This is illustrated by the following example:

| Properties | Original condition | Result | Inverted condition | Result |
| :---  | :---  | :---- | :---- | :---- |
| dog = true, cat = false | dog && cat | false  | !dog &#124; &#124; !cat | true |
| dog = 3, cat = 2 | dog < cat  | false |  dog >= cat | true |

## Language Support
Condition Inverter supports all *modern* progrogramming languages and frameworks. This includes technologies that have been ranked as the most popular on the [Stack Overflow Developer Survey](https://survey.stackoverflow.co/2022/#technology-most-popular-technologies). <br>
Disclaimer - this tool does not currently support query, shell scripting or assembly based languages.

## Local setup
```
# Requirements: Node version 11+ and NPM version 6+

# Install node dependencies:
$ npm install

# Compile dependencies and run the project in watch mode:
$ npm run compile:watch

# To run tests
# First navigate to the ../shared directory and install its node dependencies:
$ npm install

# Navigate back to the ./extension directory and run the tests:
$ npm run test

# Run tests with coverage:
$ npm run test:coverage
```

## Contributions

Open source is built by the community for the community. All contributions to this project are welcome!
<br> Additionally, if you have any suggestions for enhancements, ideas on how to take the project further or have discovered a bug, do not hesitate to create a new issue ticket and we will look into it as soon as possible!
