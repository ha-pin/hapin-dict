import { transformCyrillicToHapin, transformCyrillicToArabic } from "hapin-utils"
import fs from "fs"
import path from "path"

const __dirname = path.resolve()

const banner = [`---`,
	`name: hapin_ar.extend`,
	`version: "1.0"`,
	`sort: by_weight`,
	`use_preset_vocabulary: false`,
	`...`].join("\n")

function splitter(word: string) {
	const chars = word.split("")
	let idx = 0
	let res = []
	while (idx < chars.length) {
		const c = chars[idx]
		const next = chars[idx + 1]
		if (c === "g") {
			if (next === "h") {
				res.push("gh")
				idx += 2
				continue
			}

			res.push("g")
			idx += 1
			continue
		}

		if (c === "c") {
			if (next === "h") {
				res.push("ch")
				idx += 2
				continue
			}

			idx += 1
			continue
		}

		if (c === "y") {
			if (next === "e") {
				res.push("ye")
				idx += 2
				continue
			}

			if (next === "yu") {
				res.push("yu")
				idx += 2
				continue
			}

			idx += 1
			continue
		}

		if (c === "s") {
			if (next === "h") {
				res.push("sh")
				idx += 2
				continue
			}

			res.push("s")
			idx += 1
			continue
		}

		if (c === "x") {
			if (next === "a") {
				res.push("xa")
				idx += 2
				continue
			}

			if (next === "e") {
				res.push("xe")
				idx += 2
				continue
			}

			if (next === "o") {
				res.push("xo")
				idx += 2
				continue
			}

			if (next === "u") {
				res.push("xu")
				idx += 2
				continue
			}

			idx += 1
			continue
		}

		res.push(c)
		idx += 1
	}

	return res.join(" ")
}

export const generate2HapinArabic = () => {
	const words = fs.readFileSync(path.join(__dirname, "./dicts/words_cyrillic.txt"), "utf8").split("\n")
	const hapin = words.map(item => splitter(transformCyrillicToHapin(item)))
	const arabic = words.map(item => transformCyrillicToArabic(item))
	const res = arabic.map((item, idx) => `${item}\t${hapin[idx]}`).join("\n")
	fs.writeFileSync(path.join(__dirname, "./dicts/hapin_ar.extend.dict.yaml"), `${banner}\n${res}`)
}