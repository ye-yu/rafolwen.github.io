Jeasing Library
---

An ease function is a function for easing animation
with the domain of `[0, 1]` depicting the moment of
the frame animation (where 0 is the start of the animation
and 1 is the end of the animation).

An ease-in function means
the animation effect is at the start of animation while an
ease-out function means the animation effect is at the end
of the animation. Finally, an ease-inout function is a function
that applies ease-in at `[0, 0.5)` and then applies ease-out at
`[0.5, 1]`.

This library provides a basic implementation of easing
featuring:
  - `Function` - a function of many-to-one ideally with the domain of `[0, 1]` and the range of `[0, 1]` where `f(0) = 0` and `f(1) = 1`
  - `Interpolator` - an interpolator class using function
  - `Ease/EaseIn/EaseOut/EaseInOut` - an implementation of interpolator with easing features
  - Ease Players - an ease iterator with a `.next()` function that can be called in a render thread

  See more in the [library wiki page](https://github.com/ye-yu/jease-player/wiki/Overview).
