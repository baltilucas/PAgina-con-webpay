"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Col, Row } from "antd";

export default function Home() {
  const [value, setValue] = React.useState<string>("");
  const onPressedBuy = async () => {
    if (value == "") return null;

    const res = await fetch("/api_tbk/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: value,
        orderId: "ORDER-1234",
      }),
    });

    const data = await res.json();

    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.url;

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "token_ws";
    input.value = data.token;

    form.appendChild(input);
    document.body.appendChild(form);

    form.submit();
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/smiley-2.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />
      <main>
        <Row
          className="space-x-1"
          justify={"center"}
          style={{
            height: "100vh",
          }}
        >
          <Col
            xs={24}
            style={{ textAlign: "center", marginTop: "10px", height: "50px" }}
          >
            <h1
              style={{
                fontSize: "56px",
                fontWeight: "800",
                color: "#333333",
                marginBottom: "5px",
              }}
            >
              COMPRAR FELICIDAD <br />
              <p
                style={{
                  fontSize: "40px",
                  fontWeight: "500",
                  marginBottom: "0px",
                }}
              >
                ¿A qué precio?
              </p>
            </h1>
          </Col>
          <Col xl={6}>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ingrese precio"
              style={{ backgroundColor: "#FFFFFF" }}
            ></Input>
          </Col>
          <Col xl={1}>
            <Button onClick={onPressedBuy}>Pagar</Button>
          </Col>
        </Row>
      </main>
    </div>
  );
}
