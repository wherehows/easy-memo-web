import Link from "next/link";

interface MemoItemProps {
  id: number;
  title: string;
  date: string;
}

const MemoItem = ({ id, title, date }: MemoItemProps) => {
  return (
    <>
      <Link href={`/detail/${id}`}>
        <h2>{title}</h2>
      </Link>
      <time dateTime={date} className="text-gray-400">
        {date}
      </time>
    </>
  );
};

export default MemoItem;
