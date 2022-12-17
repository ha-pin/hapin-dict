// 生成 cin 档案支援 macOS 输入法
import fs from "fs"
import path from "path"
import { dict } from "../utils.mjs"

const { version } = JSON.parse(
    fs.readFileSync(path.join(path.resolve(), "package.json"), "utf-8")
)

const target = path.join(path.resolve(), "targets")

const HapinIME_Cyrillic_CIN = "HapinIME_Cyrillic.cin"
const HapinIME_Arabic_CIN = "HapinIME_Arabic.cin"

const content = (label, version, ename, cname, dict) => `# (c) 哈拼输入法 HapinIME 2022
# ${label} Ver.${version}
# 本词库采取非商用进行授权，保留一切可追诉的合法权益
%gen_inp
%ename ${ename}
%cname ${cname}
%encoding UTF-8
%selkey 0123456789
%keyname begin
a a
b b
c c
d d
e e
f f
g g
h h
i i
j j
k k
l l
m m
n n
o o
p p
q q
r r
s s
t t
u u
v v
w w
x x
y y
z z
%keyname end
%chardef begin
${dict}
%chardef end
`

const write = (t, text) =>
    fs.writeFileSync(path.join(target, t), text, { encoding: "utf-8" })

export function genMacOSCIN() {
    const cyrillic_dict = dict("cyrillic")
        .map((d) => `${d[0]} ${d[1]}`)
        .join("\n")
    const arabic_dict = dict("arabic")
        .map((d) => `${d[0]} ${d[1]}`)
        .join("\n")

    const cyrillic_content = content(
        "哈拼西里尔文输入方案",
        version,
        "HapinIME for Cyrillic",
        "哈拼西里尔文字输入法",
        cyrillic_dict
    )

    const arabic_content = content(
        "哈拼老文字输入方案",
        version,
        "HapinIME for Arabic",
        "哈拼老文字输入法",
        arabic_dict
    )

    write(HapinIME_Cyrillic_CIN, cyrillic_content)
    write(HapinIME_Arabic_CIN, arabic_content)
}
