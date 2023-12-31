import Header from "@/stories/Header";
import Link from "next/link";
import MemoItem from "@/stories/MemoItem";

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
  return (
    <>
      <Link
        href="/detail"
        className="absolute rounded-[50%] bg-green-500 w-[50px] h-[50px] center right-[20px] bottom-[20px] height-[20px]"
      >
        <i className="fa-solid fa-pencil text-white text-[24px]"></i>
      </Link>
      <Header>
        <Header.LeftOption logo />
        <Header.MiddleText text="메인 페이지" />
        <Header.RightOption
          option={{ search: true, filter: true, menu: true }}
        />
      </Header>
      <main>
        <ul className="flex flex-col gap-[16px]">
          {MEMO_LIST.map((memo, idx) => {
            return (
              <li key={idx}>
                <MemoItem {...memo} />
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
