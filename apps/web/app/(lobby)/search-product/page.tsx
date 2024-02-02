"use client"

import { Button, Input, Label } from "@repo/ui/components"

export default function SearchProduct() {
  return (
    <section className="max-w-md p-4 border-2 border-solid border-yellow-400">
      <div className="flex flex-row gap-4 mb-4">
        <Input placeholder="Product name, UPC, EAN, ISBN or ASIN" />
        <Button>Search</Button>
      </div>
      <p className="mb-4 text-center">or</p>
      <div className="flex flex-row gap-4">
        <Input type="file" />
        <Button>Search</Button>
      </div>
    </section>
  )
}
