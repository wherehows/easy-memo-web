"use client";

import { IconButtonOption, XOR } from "@/types/common";

import { useRouter } from "next/navigation";

type LeftOptionProps = XOR<
  {
    townSelection: boolean;
  },
  XOR<
    {
      option: {
        back?: IconButtonOption;
        close?: IconButtonOption;
      };
    },
    { empty: boolean }
  >
>;

const LeftOption = ({ empty, townSelection, option }: LeftOptionProps) => {
  const router = useRouter();

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
