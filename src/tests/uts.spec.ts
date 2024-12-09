// src/utils/__tests__/math.test.ts
import { add, subtract, readUserConfig } from "@/tests/uts";
// import { add, subtract } from "@/tests/uts";
// import { readUserConfig } from "@/utils";

describe("Math utils", () => {
    test("add function works correctly", () => {
        expect(add(2, 3)).toBe(5);
    });

    test("subtract function works correctly", () => {
        const unit = readUserConfig().units || "px";
        console.log(unit);
        expect(subtract(5, 3)).toBe(2);
    });
});
