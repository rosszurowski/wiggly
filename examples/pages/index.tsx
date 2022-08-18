import React, { useEffect, useState } from "react"
import { useSpring } from "wiggly"
import Layout from "../components/layout"

export default function Page() {
  const [open, setOpen] = useState(false)

  return (
    <Layout>
      <button onClick={() => setOpen((p) => !p)}>Toggle</button>
      <Ball open={open} />
    </Layout>
  )
}

function Ball({ open }: { open: boolean }) {
  const y = useSpring(0)

  useEffect(() => {
    y.set(open ? 120 : 0)
  }, [open])

  return (
    <div
      ref={y.ref}
      style={{
        backgroundColor: "red",
        width: 16,
        height: 16,
        borderRadius: "50%",
        transform: `translateY(${y})`,
      }}
    />
  )
}
