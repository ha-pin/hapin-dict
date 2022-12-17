import fs from "fs"
import path from "path"
import { dict } from "../utils.mjs"

const { version } = JSON.parse(
    fs.readFileSync(path.join(path.resolve(), "package.json"), "utf-8")
)

const target = path.join(path.resolve(), "targets")

const HapinIME_Cyrillic_INPUTPLUGIN = "HapinIME_Cyrillic.inputplugin"
const HapinIME_Arabic_INPUTPLUGIN = "HapinIME_Arabic.inputplugin"

const content = (label, name, version, key, dict) => `# (c) 哈拼输入法 HapinIME 2022
# ${label}
# 本词库采取非商用进行授权，保留一切可追诉的合法权益
METHOD:TABLE
ENCODE:KK
PROMPT:${name}
DELIMIER:,
VERSION:${version}
VALIDINPUTKEY:${key}
BEGINCHARACTER
${dict}
ENDCHARACTER
`

const write = (t, text) =>
    fs.writeFileSync(path.join(target, t), text, { encoding: "utf16le" })

export function genMacOS() {
    // TODO 词库生成
    const cyrillic_dict = dict("cyrillic")
        .map((d) => `${d[0]} ${d[1]}`)
        .join("\n")
    const arabic_dict = dict("arabic")
        .map((d) => `${d[0]} ${d[1]}`)
        .join("\n")

    const cyrillic_content = content(
        "哈拼西里尔文输入方案",
        "哈拼西里尔文输入法",
        version,
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        cyrillic_dict
    )

    const arabic_content = content(
        "哈拼老文字输入方案",
        "哈拼老文字输入法",
        version,
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?,$",
        arabic_dict
    )

    write(HapinIME_Cyrillic_INPUTPLUGIN, cyrillic_content)
    write(HapinIME_Arabic_INPUTPLUGIN, arabic_content)
}
