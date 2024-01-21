import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import "dayjs/locale/ja";
import "dayjs/locale/en";

const dayjsExt = dayjs;
dayjs.extend(relativeTime);

export default dayjsExt;
