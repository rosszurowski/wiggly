import { useRef, useEffect, MutableRefObject, useMemo, useId } from "react"
import { Spring, SpringConfig, SpringListenerFn } from "./wobble"
import hash from "./hash"

type SpringVarConfig = Pick<
  SpringConfig,
  "stiffness" | "damping" | "mass" | "overshootClamping"
>
type Config = {} & SpringVarConfig
type Unit = "px" | "rem" | "em" | "%"

export type SpringValue = {
  ref: MutableRefObject<any>
  set(val: number): void
  setConfig(config: Partial<SpringVarConfig>): void
  value(unit?: Unit): string
  toString(): string
}

/**
 * useSpring is a hook that animates a numeric value using a spring simulation.
 * It's intended as a lightweight alternative to other spring animation
 * libraries.
 *
 * ```jsx
 * const x = useSpring(0)
 *
 * return (
 *   <div ref={x.ref} style={{ transform: `translateX(${x})` }} />
 * )
 * ```
 */
export function useSpring(
  initial: number,
  config: Partial<Config> = {}
): SpringValue {
  const id = useId()
  const name = `--spring-${hash(id).toString(36)}`
  const ref = useRef<any | null>(null)
  const spring = useRef(new Spring({ fromValue: initial, ...config }))

  useEffect(() => {
    const s = spring.current
    const el = ref.current
    const onUpdate: SpringListenerFn = (sp) => {
      if (!el || !el.style || !el.style.setProperty) return
      // We use `any` here to avoid people needing to manually type the
      // generic ref for whichever element they're going to tie it to.
      // For example, useSpring<HTMLDivElement>().
      el.style.setProperty(name, `${sp.currentValue.toString()}`)
    }
    s.onUpdate(onUpdate).start()

    return () => {
      s.removeListener(onUpdate)
      if (!el || !el.style) return
      el.style.removeProperty(name)
    }
  }, [])

  return useMemo(
    () => ({
      /**
       * ref should be applied to the element you want to animate to set the
       * spring's value as a CSS variable.
       */
      ref,
      /**
       * set updates the value the spring animates towards.
       */
      set(val: number) {
        spring.current.updateConfig({ toValue: val }).start()
      },
      /**
       * setConfig updates the spring properties the spring uses to animate.
       */
      setConfig(config: Partial<SpringVarConfig>) {
        spring.current.updateConfig(config).start()
      },
      /**
       * value returns a CSS variable for the spring with the specified unit,
       * defaulting to pixels.
       *
       *     const x = useSpring(0)
       *
       *     style = `translateX(${x.value()})`
       *     style = `translateX(${x.value("px")})`
       */
      value(unit: Unit = "px") {
        if (unit) {
          return `calc(var(${name}) * 1${unit})`
        }
        return `var(${name})`
      },
      toString() {
        return this.value()
      },
    }),
    []
  )
}

/**
 * combineRefs takes several MutableRefObjects and joins them together into a
 * single ref callback. This is a helper intended for combining multiple spring
 * refs.
 *
 *     const x = useSpring(0)
 *     const y = useSpring(0)
 *
 *     return <div ref={combineRefs(x.ref, y.ref)} />
 */
export function combineRefs<T>(...refs: MutableRefObject<T>[]) {
  return (val: T) => {
    for (let ref of refs) {
      ref.current = val
    }
  }
}
