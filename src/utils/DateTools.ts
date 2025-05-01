/**
 * 从日期时间字符串提取日期部分 (DD-MM-YYYY)
 * @param dateString 格式应为 "DD-MM-YYYY HH:mm:ss"
 */
// export function dateFormatterDMY(dateString: string): string {
//   if (typeof dateString !== "string") return "";
//   const trimmed = dateString.trim();
//   return trimmed.split(/\s+/)[0] || trimmed;
// }

export function dateFormatterDMY(input: string): string {
  const date = new Date(input);
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 强制24小时制
  });

  // 格式化为 "05/01/2025, 15:55:50"
  const formatted = formatter.format(date);
  const [datePart, timePart] = formatted.split(", ");
  const [month, day, year] = datePart.split("/");

  return `${year}-${month}-${day} ${timePart}`;
}

/**
 * 标准化日期格式 (UTC时间，DD-MM-YYYY HH:mm:ss)
 * @param input 可接受: Date对象/ISO字符串/时间戳/本地日期字符串
 */
export function dateFormatter(input: string | number | Date): string {
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date input: ${input}`);
  }

  // UTC时间组件
  const components = {
    day: date.getUTCDate(),
    month: date.getUTCMonth() + 1,
    year: date.getUTCFullYear(),
    hours: date.getUTCHours(),
    minutes: date.getUTCMinutes(),
    seconds: date.getUTCSeconds(),
  };

  // 两位数填充
  const pad = (num: number) => num.toString().padStart(2, "0");

  return `${pad(components.day)}-${pad(components.month)}-${
    components.year
  } ${pad(components.hours)}:${pad(components.minutes)}:${pad(
    components.seconds
  )}`;
}
