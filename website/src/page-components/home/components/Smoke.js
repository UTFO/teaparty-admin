import React, { memo } from "react";
import "./Smoke.css";
const Smoke = () => {
  const list = [];
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * 25;
    list.push(<li style={{ "--i": x }}></li>);
  }
  console.log(list);
  return <ul className="smoke-animation">{list}</ul>;
};

export default memo(Smoke);
