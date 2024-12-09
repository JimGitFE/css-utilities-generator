// const { filterClasses } = require("../../dist/utils");
import { filterClasses } from "../utils";
// Config: empty

test("Numeric Values", () => {
    // Test generator with numeric values
    const attributes = ["fs-125", "br-25"];

    expect(filterClasses(attributes)).toEqual([
        { fullClass: "fs-125", classKey: "font-size", classValue: "125px" },
        { fullClass: "br-25", classKey: "border-radius", classValue: "25px" },
    ]);
});

test("Unique extensions", () => {
    // Test generator with numeric values
    const attributes = ["h-100", "bto-2"];

    expect(filterClasses(attributes)).toEqual([
        { fullClass: "h-100", classKey: "height", classValue: "100%" },
        { fullClass: "bto-2", classKey: "border-top", classValue: "2px solid" },
    ]);
});

test("Variable Values", () => {
    // Test generator with css variables
    const attributes = ["c--color-functional-alert-100"];

    expect(filterClasses(attributes)).toEqual([
        { fullClass: "c--color-functional-alert-100", classKey: "color", classValue: "var(--color-functional-alert-100)" },
    ]);
});

test("Dictionary Values", () => {
    // Test generator with dictionary non-numeric property values
    const attributes = ["h-mxc"];

    expect(filterClasses(attributes)).toEqual([{ fullClass: "h-mxc", classKey: "height", classValue: "max-content" }]);
});
