Minecraft Play Data
---
A Fabric client-side mod that captures the client-side perspective of Minecraft gameplay.

## How it works

v0.0.1 spawns two threads: a publisher thread, and a consumer thread.
A publisher thread publishes the data periodically into a shared ring buffer
by executing a series of functions that pushes the data into the ring
buffer. A consumer thread queries next data from the ring buffer and appends
the data as bytes into the log files before flushing the buffer.

These threads only run when the player is in the game and is not pausing
the game. After the player has left the game, a parser will convert the byte
data into a readable `json` format. At the start of the game, the parser will
look for leftover unconverted byte data files and try to convert them again.
The mod does the`json` conversion only if it is configured in the
configuration file.

In case of a late reader scenario, the publisher will append
the data at the end of the buffer potentially increasing the
size of the buffer. This will result in data being out of the order,
which is observable in the converted `json` file. The time
data for each capture instance can be used to sort them again.

More info on the data collection can be found
[at my repo itself](https://github.com/ye-yu/minecraft-data/). 
