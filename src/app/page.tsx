"use client";

import Header from "@/stories/Header";
import MemoItem from "@/stories/MemoItem";
import { classNames } from "@/utils/helpers";
import { useState } from "react";

const MEMO_LIST = [
  {
    id: 1,
    title:
      '용역업체에 벌점 취소 후 재부과한 서울교통공사…"신뢰보호 위반"[서초카페]',
    date: "2023-12-31",
  },
  {
    id: 2,
    title: "카카오 비상경영회의 재정비… 새해 쇄신 불 댕긴다",
    date: "2023-11-22",
  },
  {
    id: 3,
    title: "세계가 주목하는 ADC… 국내서도 M&A·지분투자 속도",
    date: "2023-11-01",
  },
  {
    id: 4,
    title:
      '용역업체에 벌점 취소 후 재부과한 서울교통공사…"신뢰보호 위반"[서초카페]',
    date: "2023-12-31",
  },
  {
    id: 5,
    title: "신촌서 역주행하던 킥보드, 승용차 충돌…1명 의식불명",
    date: "2023-09-21",
  },
];

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Header>
        {isEditing ? (
          <Header.LeftOption
            option={{
              close: {
                onClick: () => {
                  setIsEditing(false);
                },
              },
            }}
          />
        ) : (
          <Header.LeftOption empty />
        )}
        {isEditing ? (
          <Header.RightOption
            option={{
              allSelection: {
                onClick: () => {},
              },
              remove: {
                onClick: () => {},
              },
            }}
          />
        ) : (
          <Header.RightOption
            option={{
              edit: {
                onClick: () => {
                  setIsEditing(true);
                },
              },
              write: true,
            }}
          />
        )}
      </Header>
      <main>
        <ul className="flex flex-col gap-[16px] pt-[8px] pb-[16px] px-[24px]">
          {MEMO_LIST.map((memo) => {
            const { id, title, date } = memo;

            return (
              <li
                key={id}
                className={classNames(isEditing ? "flex flex-row" : "")}
              >
                {isEditing ? (
                  <>
                    <input type="checkbox" />
                    <label className="flex flex-col">
                      {title}
                      <time dateTime={date} className="text-gray-400">
                        {date}
                      </time>
                    </label>
                  </>
                ) : (
                  <MemoItem {...memo} />
                )}
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
