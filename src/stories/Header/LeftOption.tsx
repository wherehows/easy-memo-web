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
        cancel?: IconButtonOption;
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

  if (townSelection) {
    return <div>동네 선택 컴포넌트(미완)</div>;
  }

  if (option) {
    const { back, close, cancel } = option;

    const Cancel = cancel && "onClick" in cancel && (
      <button onClick={cancel.onClick}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    );

    const Back = back && (
      <button
        onClick={() => {
          router.back();
        }}
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>
    );

    const Close = close && (
      <button
        onClick={() => {
          router.back();
        }}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    );

    return <div className="center">{[Cancel, Back, Close]}</div>;
  }
};

export default LeftOption;
