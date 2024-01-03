import MemoItem from "./index";

const meta = {
  title: "components/MemoItem",
};

export default meta;

const MEMO_LIST = [
  {
    id: 1,
    title:
      '용역업체에 벌점 취소 후 재부과한 서울교통공사…"신뢰보호 위반"[서초카페]',
    date: new Date(),
  },
  {
    id: 2,
    title: "카카오 비상경영회의 재정비… 새해 쇄신 불 댕긴다",
    date: new Date(),
  },
  {
    id: 3,
    title: "세계가 주목하는 ADC… 국내서도 M&A·지분투자 속도",
    date: new Date(),
  },
  {
    id: 4,
    title:
      '용역업체에 벌점 취소 후 재부과한 서울교통공사…"신뢰보호 위반"[서초카페]',
    date: new Date(),
  },
  {
    id: 5,
    title: "신촌서 역주행하던 킥보드, 승용차 충돌…1명 의식불명",
    date: new Date(),
  },
];

export const Index = {
  render: () => {
    return (
      <ul>
        {MEMO_LIST.map((memo, idx) => {
          return (
            <li key={idx}>
              <MemoItem {...memo} />
            </li>
          );
        })}
      </ul>
    );
  },
};
