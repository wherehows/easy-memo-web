"use client";

import { IconButtonOption, XOR } from "@/types/common";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("header");

  if (empty) {
    return <div />;
  }

  if (option) {
    const { back, close } = option;

    const Back = back && (
      <button key="back" onClick={back.onClick}>
        {t("back")}
      </button>
    );
    const Close = close && (
      <button key="close" onClick={close.onClick}>
        {t("close")}
      </button>
    );

    return <div className="center">{[Back, Close]}</div>;
  }
};

export default LeftOption;
