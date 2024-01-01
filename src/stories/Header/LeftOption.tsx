"use client";

import { IconButtonOption, XOR } from "@/types/common";
import Link from "next/link";

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

  if (townSelection) {
    return <div>동네 선택 컴포넌트(미완)</div>;
  }

  if (option) {
    const { back, close } = option;

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

    return <div className="center">{[Back, Close]}</div>;
  }
};

export default LeftOption;
