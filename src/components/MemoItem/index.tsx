import { Link } from "@/utils/navigation";

export interface MemoItemProps {
  id: string;
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
      <time className="text-sm text-gray-400" dateTime={date}>
        {date}
      </time>
    </>
  );
};

export default MemoItem;
