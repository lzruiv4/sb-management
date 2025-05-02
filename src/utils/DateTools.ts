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
