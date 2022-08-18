<p align="center"> 
    <img width="90%" src="assets/readme/png/banner/banner-12.png" alt="Banner">
</p>

<div align="center">
    <a href="https://marketplace.visualstudio.com/items?itemName=OvidijusParsiunas.condition-inverter">
        <img style="margin-left: -14px" src="https://vsmarketplacebadge.apphb.com/version/ovidijusparsiunas.condition-inverter.svg" alt="Visual Studio Marketplace version">
    </a>
    <a href="https://img.shields.io/github/workflow/status/OvidijusParsiunas/condition-inverter/push%20to%20main%20branch">
        <img src="https://img.shields.io/github/workflow/status/OvidijusParsiunas/condition-inverter/push%20to%20main%20branch" alt="Build status">
    </a>
    <a href="https://app.codecov.io/gh/OvidijusParsiunas/condition-inverter">
        <img src="https://img.shields.io/codecov/c/github/OvidijusParsiunas/condition-inverter" alt="Code coverage">
    </a>
    <a href="https://ovidijusparsiunas.testspace.com/projects/66878/spaces">
        <img src="https://img.shields.io/testspace/tests/ovidijusparsiunas/ovidijusparsiunas:condition-inverter/main" alt="Number of tests that have passed">
    </a>
</div>

## Description

A simple tool used to invert conditions for all modern programming languages and frameworks! It can be used to invert if statements, ternary operators, conditional assignments and much more - in both standard code files and html templates!

## Platforms

Website - [conditioninverter.com](http://conditioninverter.com/), [Github](https://github.com/OvidijusParsiunas/condition-inverter/tree/main/website)

<p align="center">
    <img width="100%" src="assets/readme/gif/website/website-5.gif" alt="Website gif">
</p>

VS Code Extension - [Marketplace](https://marketplace.visualstudio.com/items?itemName=OvidijusParsiunas.condition-inverter), [Github](https://github.com/OvidijusParsiunas/condition-inverter/blob/main/extension)
<p align="center">
    <img width="100%" src="assets/readme/gif/extension/ide/extension-ide-6.gif" alt="Extension gif">
</p>


## Theory
This tool takes an input condition, analyzes it and produces a new condition that yields an absolute opposite result. This is illustrated by the following example:

| Properties | Original condition | Result | Inverted condition | Result |
| :---  | :---  | :---- | :---- | :---- |
| dog = true, cat = false | dog && cat | false  | !dog &#124; &#124; !cat | true |
| dog = 3, cat = 2 | dog < cat  | false |  dog >= cat | true |

## Language Support
Condition Inverter supports all *modern* progrogramming languages and frameworks. This includes technologies that have been ranked as the most popular on the [Stack Overflow Developer Survey](https://survey.stackoverflow.co/2022/#technology-most-popular-technologies). <br>
Disclaimer - this tool does not currently support query, shell scripting or assembly based languages.

## Contributions

Open source is built by the community for the community. All contributions to this project are welcome!
<br> Additionally, if you have any suggestions for enhancements, ideas on how to take the project further or have discovered a bug, do not hesitate to create a new issue ticket and we will look into it as soon as possible!
