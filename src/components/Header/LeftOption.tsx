"use client";

import { IconButtonOption } from "@/types/common";
import { useTranslations } from "next-intl";

type LeftOptionProps = {
  option: {
    back?: IconButtonOption;
    close?: IconButtonOption;
  };
};

const LeftOption = ({ option }: LeftOptionProps) => {
  const t = useTranslations("header");

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
