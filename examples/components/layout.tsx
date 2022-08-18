import React from "react"
import Link from "next/link"

type Props = {
  children?: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <nav className="mb-4">
        <Link href="/">Basic</Link>
        <Link href="/multi">Multiple</Link>
      </nav>
      {children}
    </div>
  )
}
