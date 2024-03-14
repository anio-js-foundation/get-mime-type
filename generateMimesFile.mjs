import fs from "node:fs/promises"

let mimes = []

const lines = (await fs.readFile("./src/mime.types")).toString().split("\n").filter(x => {
	return x.length
})

// first line is "types {"
lines.shift()
// last line is "}"
lines.pop()

let data = lines.join(" ")
let state = 0;
let current_mime = ""
let current_extensions = ""
let prev_ch = ""

for (let i = 0; i < data.length; ++i, prev_ch = data[i - 1]) {
	const ch = data[i]

	if (state === 0) {
		// eat whitespace
		if (ch === " ") continue

		current_mime += ch;
		state = 1;
	} else if (state === 1) {
		if (ch !== " " && prev_ch === " ") {
			state = 2;
			current_extensions += ch;

			continue;
		}

		current_mime += ch
	} else if (state === 2) {
		if (ch === ";") {

			for (const extension of current_extensions.trim().split(" ")) {
				mimes.push({
					extension,
					type: current_mime.trim()
				})
			}

			state = 0;

			current_mime = current_extensions = "";
		} else {
			current_extensions += ch;
		}
	}
}

//
// sort by longest extension
// so that the longest extension comes first
//
mimes.sort((a, b) => {
	return b.extension.length - a.extension.length
})

function toExport(mimes) {
	let ret = `[\n`

	for (const {extension, type} of mimes) {
		ret += `    {extension: ${JSON.stringify(extension)}, mime: ${JSON.stringify(type)}},\n`
	}

	// remove trailing new line and comma
	return ret.slice(0, ret.length - 2) + "\n]"
}

let warning = `/* Warning, this file was created automatically */`

await fs.writeFile("./src/mime_types.mjs", `${warning}\nexport default ${toExport(mimes)};\n`)
