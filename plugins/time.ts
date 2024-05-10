import { useDayjs } from "#dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const dayjs = useDayjs();
dayjs.extend(customParseFormat);

export default defineNuxtPlugin({
  name: "time",
  setup() {
    return {
      provide: {
        time: dayjs,
      },
    };
  },
});
