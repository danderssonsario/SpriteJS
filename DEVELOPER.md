# SpriteJS
## Description of code
This module is programmed object oriented using class syntax and encourages this for uses of this module.

In an animation loop you can easily set value to a selection of attributes/properties in order to incorporate any kinematic/animation behaviour.
### Components

- [Sprite.js](./src/Sprite.js) - Is the main class of this module. It encapsulates animations and kinematic behaviour in one class, giving the ability to create animated game objects.

- [Animation](./src/Animations/Animation.js) - Stores all animation data of your sprite instance. Also generates array of framedata from constructor parameters.

- [Frame](./src/Animations/Frame.js) - Stores data of a single frame.

- [Sheet](./src/Animations/Sheet.js) - Creates an image-element from the sprite sheet url.

- [Body](./src/Physics/Body.js) - Encapsulates all kinematic behaviour such as position, velocity, acceleration and friction.

- [Rectangle](./src/Physics/Rectangle.js) - Class for rectangular bodies. Extends Body class but also incorporates stuff like collision detection and movement boundaries.

## Things to improve
### Create a scoreboard class
- Encapsulate score tracking in its own class. Also easier to extend functionality for later.

## Things to extend
### Enable possibility to create sprites in other shapes.
- Inheriting the Body class, add the possibility to create sprites in circular or any polygonal shape.

## Contribute
To get more information about the project and use guide, read the [README.md](./README.md).

### Getting started
- If you spot a case of improving/extending the project and a related issue doesn't exist, you can open a [new issue](https://github.com/danderssonsario/SpriteJS/issues/new/choose).

- You can also scan through any [existing issues](https://github.com/danderssonsario/SpriteJS/issues) to find one that you want to contribute to.

- Make your changes locally and commit them.

- When implementation is done, create a pull request to the develop branch.

- When implementation is approved, it is merged into main!
