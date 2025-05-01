import { describe, it, expect, beforeAll } from "vitest";
import { dateFormatter } from "@/utils/DateTools";

// 确保测试环境时区一致
beforeAll(() => {
  process.env.TZ = "UTC";
});

// describe("dateFormatterDMY", () => {
//   it("提取标准格式的日期部分", () => {
//     expect(dateFormatterDMY("14-04-2025 22:20:37")).toBe("14-04-2025");
//   });

//   it("处理无时间部分的输入", () => {
//     expect(dateFormatterDMY("14-04-2025")).toBe("14-04-2025");
//   });

//   it("处理前后空格", () => {
//     expect(dateFormatterDMY("  14-04-2025  ")).toBe("14-04-2025");
//   });

//   it("处理空字符串", () => {
//     expect(dateFormatterDMY("")).toBe("");
//   });

//   it("处理非字符串输入返回空", () => {
//     expect(dateFormatterDMY(null as any)).toBe("");
//     expect(dateFormatterDMY(undefined as any)).toBe("");
//   });
// });

describe("dateFormatter", () => {
  it("转换ISO字符串 (UTC)", () => {
    expect(dateFormatter("2025-04-14T22:20:37Z")).toBe("14-04-2025 22:20:37");
  });

  it("转换本地格式字符串", () => {
    expect(dateFormatter("April 14, 2025 22:20:37 GMT+0000")).toBe(
      "14-04-2025 22:20:37"
    );
  });

  it("转换Unix时间戳", () => {
    expect(dateFormatter(1744669237000)).toBe("14-04-2025 22:20:37"); // 2025-04-14T22:20:37Z
  });

  it("转换Date对象", () => {
    const date = new Date(Date.UTC(2025, 3, 14, 22, 20, 37));
    expect(dateFormatter(date)).toBe("14-04-2025 22:20:37");
  });

  it("边界值-闰日", () => {
    expect(dateFormatter("2024-02-29T23:59:59Z")).toBe("29-02-2024 23:59:59");
  });

  it("边界值-午夜", () => {
    expect(dateFormatter("2025-01-01T00:00:00Z")).toBe("01-01-2025 00:00:00");
  });

  it("无效输入抛出错误", () => {
    expect(() => dateFormatter("invalid")).toThrow("Invalid date input");
    expect(() => dateFormatter("")).toThrow();
  });

  it("时区无关性验证", () => {
    // 在任意时区都应返回相同结果
    const utcDate = "2025-04-14T22:20:37Z";
    const istDate = "2025-04-15T03:50:37+05:30"; // 同一时刻的印度时区时间
    expect(dateFormatter(utcDate)).toBe("14-04-2025 22:20:37");
    expect(dateFormatter(istDate)).toBe("14-04-2025 22:20:37");
  });
});
