import {
    transformCyrillicToHapin,
    transformCyrillicToArabic,
} from "hapin-utils"
import path from "path"
import fs from "fs"

const complete = (hapin) =>
    hapin.includes("x") ? [hapin, `x${hapin.replace(/x/g, "")}`] : [hapin]

const arabicSymbols = [
    [",", "،"],
    ["?", "؟"],
    ["$", "￥"]
]

export const dict = (mod) => {
    const text = fs.readFileSync(
        path.join(path.resolve(), "sources", "r.txt"),
        "utf-8"
    )

    const tb = text
        .split("\n")
        .map((t) => {
            if (mod === "cyrillic") {
                return complete(transformCyrillicToHapin(t)).map((hh) => [
                    hh,
                    t,
                ])
            } else {
                // arabic
                const a = transformCyrillicToArabic(t)
                return complete(transformCyrillicToHapin(t)).map((hh) => [
                    hh,
                    a,
                ])
            }
        })
        .flat(1)

    if (mod === "arabic") {
        return [...arabicSymbols, ...tb]
    } else {
        return tb
    }
}
