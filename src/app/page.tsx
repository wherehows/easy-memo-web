import Header from "@/stories/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link
        href="/write"
        className="absolute rounded-[50%] bg-green-500 w-[50px] h-[50px] center right-[20px] bottom-[20px] height-[20px]"
      >
        <i className="fa-solid fa-plus text-white text-[24px]" />
      </Link>
      <Header>
        <Header.LeftOption logo />
        <Header.MiddleText text="메인 페이지" />
        <Header.RightOption
          option={{ search: true, filter: true, menu: true }}
        />
      </Header>
      <main></main>
    </>
  );
}
