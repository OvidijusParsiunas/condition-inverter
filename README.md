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

This project has been designed to directly invert the conditional syntax within an if statement for it to produce an absolute opposite result. This is illustrated by the following table:

Index: ```dog``` = true, ```cat``` = false.

| Original if statement | Result | Inverted if statement | Result |
| :---  | :---- | :---- | :---- |
| ```if (dog)``` | ```true``` |  ```if (!dog)``` | ```false``` |
| ```if (dog && cat)``` | ```false```  | ```if (!dog || !cat)``` | ```true``` |
| ```if (dog || cat)``` | ```true``` | ```if (!dog && !cat)``` | ```false``` |
| ```if (dog < cat)``` | ```false``` |  ```if (dog >= cat)``` | ```true``` |

Whilst the if statement inversion problem could be solved by simply wrapping the conditional logic between brackets and adding an exclamation mark in the front; such process would not yield ideal results as it would only add more complexity to the existing codebase - lowering its cohesion and making it more difficult to maintain. Hence, to produce the most sound results and uphold the quality of the if statement syntax - this project carefully analyzes the encompassing conditional logic and procedurally inverts it in a manner that preserves its original structure and maintains its cohesion:

| Input | Naive result :ballot_box_with_check: | If Inverter result :white_check_mark: |
| :--- | :---- | :--- |
| ```if (!(dog))``` | ```if (!(!(dog)))``` | ```if (dog)``` |
| ```if (true && 0)``` | ```if (!(true && 0))``` | ```if (false || 1)``` |
| ```if (((dog && cat)))``` | ```if (!((dog && cat)))``` | ```if (((!dog || !cat))```) |

## Contributions

Open source is built by the community for the community. All contributions to this project are welcome!
<br> Additionally, if you have any suggestions for enhancements, ideas on how to take the project further or have discovered a bug, do not hesitate to create a new issue ticket and we will look into it as soon as possible!
