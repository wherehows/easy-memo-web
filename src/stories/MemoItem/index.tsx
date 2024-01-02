import { formatTimeDifference } from "@/utils/helpers";
import Link from "next/link";

interface MemoItemProps {
  id: number;
  title: string;
  date: Date;
}

const MemoItem = ({ id, title, date }: MemoItemProps) => {
  return (
    <>
      <Link href={`/detail/${id}`}>
        <h2>{title}</h2>
      </Link>
      <time className="text-gray-400">{formatTimeDifference(date)}</time>
    </>
  );
};

export default MemoItem;
