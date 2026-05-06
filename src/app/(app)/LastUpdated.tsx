"use client";

import { useEffect, useRef, useState } from "react";
import ago from "s-ago";

export default function LastUpdated(props: { value: Date }) {
  useEffect(() => {
    const id = setInterval(() => {
      if (ref.current) {
        console.log("Hello?")
        ref.current.innerText = ago(props.value);
      }
    }, 1000)
    return () => {
      clearInterval(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = useRef<HTMLSpanElement>(null);


  return <span ref={ref}>{ago(props.value)}</span>;
}
