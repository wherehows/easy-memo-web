import { IconButtonOption, XOR } from "@/types/common";
import { classNames } from "@/utils/helpers";
import { Link } from "@/utils/navigation";
import { useTranslations } from "next-intl";

type RightOptionProps = XOR<
  {
    text: string;
  },
  {
    option: {
      save?: IconButtonOption;
      remove?: IconButtonOption;
      edit?: IconButtonOption;
      back?: boolean;
      write?: boolean;
      share?: IconButtonOption;
    };
  }
>;

const RightOption = ({ text, option }: RightOptionProps) => {
  const t = useTranslations("header");

  if (text) {
    return <button>{text}</button>;
  }

  if (option) {
    const { write, share, save, edit, remove } = option;

    const Remove = remove && "onClick" in remove && (
      <button
        key="remove"
        className={classNames(!!remove.disabled && "text-gray-500")}
        aria-disabled={remove.disabled}
        disabled={remove.disabled}
        onClick={remove.onClick}
      >
        {t("delete")}
      </button>
    );

    const Edit = edit && "onClick" in edit && (
      <button
        key="onClick"
        className={classNames(!!edit.disabled && "text-gray-500")}
        aria-disabled={edit.disabled}
        disabled={edit.disabled}
        onClick={edit.onClick}
      >
        {t("edit")}
      </button>
    );
    const Write = write && (
      <Link key="write" href="/write">
        {t("create")}
      </Link>
    );

    const Share = share && "onClick" in share && (
      <button key="share" onClick={share.onClick}>
        {t("share")}
      </button>
    );

    const Save = save && "onClick" in save && (
      <button
        key="onClick"
        onClick={save.onClick}
        aria-disabled={save.disabled}
        disabled={save.disabled}
      >
        {t("save")}
      </button>
    );

    return (
      <div className="flex grow flex-row-reverse">
        <div className="flex gap-[18px]">
          {[Share, Edit, Save, Write, Remove]}
        </div>
      </div>
    );
  }
};

export default RightOption;
