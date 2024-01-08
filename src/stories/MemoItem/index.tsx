import { Link } from "@/utils/navigation";

export interface MemoItemProps {
  id: number;
  title: string;
  content: string;
  date: string;
}

const MemoItem = ({ id, title, date }: MemoItemProps) => {
  return (
    <>
      <Link href={`/detail/${id}`}>
        <h2>{title}</h2>
      </Link>
      <time className="text-sm text-gray-400">{date}에 작성됨</time>
    </>
  );
};

export default MemoItem;
