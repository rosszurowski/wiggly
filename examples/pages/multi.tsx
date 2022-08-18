import React, { useEffect, useState } from "react"
import { useSpring, combineRefs } from "wiggly"
import Layout from "../components/layout"

export default function Page() {
  const [target, setTarget] = useState<[number, number]>([0, 0])

  const handleClick = () => {
    setTarget([randomInt(10, 500), randomInt(10, 200)])
  }

  return (
    <Layout>
      <header>
        <button onClick={handleClick}>Randomize</button>
      </header>
      <div className="area">
        <Ball target={target} initial={target} />
      </div>
    </Layout>
  )
}

function Ball(props: { target: [number, number]; initial: [number, number] }) {
  const { target, initial } = props

  // We use two springs, one for each variable we want to animate.
  // Then, we use `combineRefs` to combine them into one.
  const x = useSpring(initial[0])
  const y = useSpring(initial[1])

  useEffect(() => {
    x.set(target[0])
    y.set(target[1])
  }, [target, x, y])

  return (
    <div
      className="w-6 h-6 bg-red-500 rounded-full"
      ref={combineRefs(x.ref, y.ref)}
      style={{ transform: `translate(${x}, ${y})` }}
    />
  )
}

const randomInt = (min: number, max: number) => Math.floor(Math.random() * max)
