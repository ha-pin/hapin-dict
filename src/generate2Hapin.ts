import path from "path"
import fs from "fs"
import { transformCyrillicToHapin } from "hapin-utils"

const __dirname = path.resolve()

export const generate2Hapin = () => {
	const words = fs.readFileSync(path.join(__dirname, "./dicts/words_cyrillic.txt"), "utf8").split("\n")
	const res = words.map(word => transformCyrillicToHapin(word))
	fs.writeFileSync(path.join(__dirname, "./dicts/words_hapin.txt"), res.join("\n"))
}