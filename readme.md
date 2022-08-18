<div align="center">
  <img src="https://raw.githubusercontent.com/rosszurowski/wiggly/HEAD/media/cover.svg" width="300" alt="Wiggly, a React spring library" />
</div>

Spring animations in React & Typescript. Zero dependencies and lightweight (2kb). A simple alternative to libraries like [framer-motion](https://github.com/framer/motion) (~50kB) and [react-spring](https://react-spring.dev/) (~20kB).

## Usage

Import the `useSpring` hook, and tag the element you want to animate with the `ref` property.

```tsx
import { useSpring } from "wiggly"

function Panel() {
  const [open, setOpen] = useState(false)
  const y = useSpring(0)

  useEffect(() => {
    y.set(120)
  }, [open])

  return <div ref={y.ref} style={{ transform: `translateY(${y})` }} />
}
```

To animate multiple properties, create multiple springs and combine the refs with the `combineRefs` helper:

```tsx
import { useSpring, combineRefs } from "wiggly"

function Ball(props) {
  const x = useSpring(0)
  const y = useSpring(0)

  useEffect(() => {
    x.set(props.x)
    y.set(props.y)
  }, [props])

  return (
    <div
      ref={combineRefs(x.ref, y.ref)}
      style={{ transform: `transform(${x}, ${y})` }}
    />
  )
}
```

## Examples

A few examples of how to use wiggly are in the `examples` directory.

## Motivation

I frequently want to add spring-based animations to React apps, but feel guilty when I see the bundle sizes of existing solutions

- `react-spring` is [19.4kB](https://bundlephobia.com/package/react-spring@9.5.2) large.
- `framer-motion` is [50.9kB](https://bundlephobia.com/package/framer-motion@7.2.1). They offer a tree-shaking guide, but it doesn't make a huge difference in my testing. It's also a general purpose animation toolkit, which you don't often need
- `motion` is only [9.4kB](https://bundlephobia.com/package/motion@10.14.1), but doesn't offer React bindings (yet)

Wiggly is only 2kb. Most of that is [wobble](https://github.com/skevy/wobble), which provides the spring logic. Of course, this low weight comes with a few limitations:

- Wiggly only animates numeric values (eg. 0 to 1), not color or string values (eg. `red` to `blue` or `#000` to `#fff`). If you want this, you can animate a value between 0 to 1 and map the change yourself using a library like [chroma.js](https://github.com/gka/chroma.js) to do the math.
- Wiggly only gives you values & CSS variables, not styles. You need to manually assign variables to a `transform` or whatnot. This gives you more control, but it takes a little more work.

## Acknowledgements

Wiggly illustration was made by [Hannah Lee](https://hannahlee.ca).
