# If Inverter

A simple tool used to invert if statements for all programming languages.

## Platforms

### Website

More information [here](https://github.com/OvidijusParsiunas/if-inverter/tree/main/website).

Insert gif here

### VSCode Extension

More information [here](https://github.com/OvidijusParsiunas/if-inverter/blob/main/extension).

Insert gif here

## Theory

If statement inversion is the same as condition inversion. This project has been specifically designed to directly invert the logical syntax within if statements for them to produce an absolute opposite result. This is illustrated by the following table:

Whilst a direct inversion problem can be solved by simply negating the if statement syntax with an exclamation mark; such solution would not produce ideal results in more complex scenarios as the conditional logic would still need to be comprehended by the reader which coupled with the overhead negation would only introduce more cognitive complexity. Hence, to retain the cohesion and maintainability of an if statement - this project aims to analyze its syntax with more granularity and add inversion where necessary:

Input: if (!(dog))
Simple Result: if (!(!(dog)))
If Inverter Result: if (dog)

Input: if (true && 0)
Simple Result: if (!(true && 0))
If Inverter Result: if (false || 1)

Input: if (((dog && cat)))
Simple Result: if (!((dog && cat)))
If Inverter Result: if (((!dog || !cat)))

## Contributions

Open source is built by the community for the community. All contributions to this project are welcome!
<br> Additionally, if you have any suggestions for enhancements, ideas on how to take the project further or have discovered a bug, do not hesitate to create a new issue ticket and we will look into it as soon as possible!
