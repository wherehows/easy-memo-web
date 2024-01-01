import { IconButtonOption, XOR } from "@/types/common";
import Link from "next/link";

type RightOptionProps = XOR<
  {
    text: string;
  },
  {
    option: {
      save?: IconButtonOption;
      remove?: IconButtonOption;
      allSelection?: IconButtonOption;
      edit?: IconButtonOption;
      back?: boolean;
      write?: boolean;
      share?: IconButtonOption;
    };
  }
>;

const RightOption = ({ text, option }: RightOptionProps) => {
  if (text) {
    return <button>{text}</button>;
  }

  if (option) {
    const { write, share, save, edit, remove, allSelection } = option;

    const AllSelection = allSelection && "onClick" in allSelection && (
      <button onClick={allSelection.onClick}>전체 선택</button>
    );
    const Remove = remove && "onClick" in remove && (
      <button onClick={remove.onClick}>삭제</button>
    );

    const Edit = edit && "onClick" in edit && (
      <button onClick={edit.onClick}>편집</button>
    );
    const Write = write && <Link href="/write">작성</Link>;

    const Share = share && "onClick" in share && (
      <button onClick={share.onClick}>공유</button>
    );
    const saveDisabled = save && typeof save !== "boolean" && !!save.disabled;
    const Save = save && "onClick" in save && (
      <button onClick={save.onClick} disabled={saveDisabled}>
        저장
      </button>
    );

    return (
      <div className="flex gap-[18px]">
        {[Share, Edit, Save, Write, AllSelection, Remove]}
      </div>
    );
  }
};

export default RightOption;
