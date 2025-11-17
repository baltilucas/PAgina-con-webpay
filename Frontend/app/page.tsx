"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {

  const [input, setInput] = React.useState<string>("");
  const onPressedBuy = async () =>
  {
    if(input == "") return null;

    const res = await fetch(`/api_tbk?price=${input}`)
    const data = await res.json()
    console.log(data);
  };

  return (
    <main>
      <div className="space-y-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ingrese precio"></Input>
        <Button onClick={onPressedBuy}>COMPRAR</Button>
      </div>
    </main>
  );
}
