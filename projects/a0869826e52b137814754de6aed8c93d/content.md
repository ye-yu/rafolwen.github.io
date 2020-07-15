Python List Stream
---
([Related code snippet][1])

I did some data engineering tasks during the duration of my internship, and I was introduced to the data stream from Spark. I was amazed on how clean and easily the code became when using stream instead of using for-loop. In fact, the semantic of stream has always been a part of the Java library through their stream API.

In python, there is a feature called a list comprehension. We can easily create a list and performing various actions such as filter, map, and so on.

```python
a = [i for i in range(5)] # creates [0, 1, 2, 3, 4]
b = [i for i in a if is_prime(i)] # creates [2, 3]

# one line
c = [i for i in range(5) if is_prime(i)]
```

The disadvantage of this is that it gets too cluttered together when putting the too many operations in one line. In Java, the same operation can be neatly written using `IntStream`.

```java
// NumberClass is a custom class
IntStream.range(0, 5).filter(NumberClass::isPrime).toArray()
```

A similar implementation can be done on python by utilising the built-in `filter` and `map` functions. In the my [code snippet][1], I wrap an iterable into `iter()` function and store it as the instance iterable field. By using the filter function, the iterable is passed into the built-in filter function, and the new iterable is set as current iterable. When the `collect` method is called, the current iterable is the same as

```python
filter(some_function, iter(the_original_iterable))
```
, and this will be passed into `list` to create a new list.

The advantage of stream is that the collect operation can be postpone and all operations can be made dynamic.

```python
stream = Stream.of(...)
# some codes here
if (...):
  stream = stream.map(...).filter(...)
while(...):
  stream = stream.map(...)
# some more codes here
result = stream.collect() # consume the stream here
```

[1]: https://gist.github.com/ye-yu/26d6806ceb1f7b0712763a1ce6bdac29
