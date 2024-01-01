"use client";

import { IconButtonOption, XOR } from "@/types/common";

type LeftOptionProps = XOR<
  {
    option: {
      back?: IconButtonOption;
      close?: IconButtonOption;
    };
  },
  { empty: boolean }
>;

const LeftOption = ({ empty, option }: LeftOptionProps) => {
  if (empty) {
    return <div />;
  }

  if (option) {
    const { back, close } = option;

    const Back = back && <button onClick={back.onClick}>뒤로가기</button>;
    const Close = close && <button onClick={close.onClick}>닫기</button>;

    return <div className="center">{[Back, Close]}</div>;
  }
};

export default LeftOption;
