import path from "path"
import fs from "fs"
import { transformCyrillicToArabic } from "hapin-utils"

const __dirname = path.resolve()

export const generate2Arabic = () => {
	const words = fs.readFileSync(path.join(__dirname, "./dicts/words_cyrillic.txt"), "utf8").split("\n")
	const res = words.map(word => transformCyrillicToArabic(word))
	fs.writeFileSync(path.join(__dirname, "./dicts/words_arabic.txt"), res.join("\n"))
}