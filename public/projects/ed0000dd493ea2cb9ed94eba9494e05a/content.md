Minecraft Modding Experience
---

If you don't know yet, Minecraft is a sandbox game where the gameplay is purely dynamic, and the goal is up to the player's intention. It can be a block building game, and it can also be a fighting game, and it can also be an adventure game. This dynamic gameplay really captured the attention of a wide-range of players all around the world.

The first version of Minecraft is compiled in Java language, and it has become the main version of Minecraft especially after modding is introduced by the community. Modding adds custom experiences to the vanilla gameplay, and it has been a hobby among Java Minecraft players to build custom mod. I have also built a few mods for Minecraft, and honestly, a lot of things can be learnt in terms of coding style, package managements, etc.

The first mod that I created is called [Teleporter Tools][1]. Here, I learnt about the importance of statics to save memories. New items, blocks, and entities are added to the registry so that any comparisons can be used using `==` instead of `instanceof`. I have also started to use enum class a lot.

In addition, there are extra tools that helped in modifying compiled java bytecode. `Mixins` provides method injections to add extra line of code at any target methods. `AccessWidener` widens non-public property of a class so that it can be accessed by its instantiation or sub-class.

[1]: https://www.planetminecraft.com/mod/teleporter-tools/
