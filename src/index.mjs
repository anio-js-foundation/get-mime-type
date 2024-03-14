import mime_types from "./mime_types.mjs"

function getMimeType_impl(file_name) {
	let default_mime_type = `application/octet-stream`

	for (const entry of mime_types) {
		if (file_name.endsWith(`.${entry.extension}`)) {
			return entry.mime
		}
	}

	return default_mime_type
}

getMimeType_impl.reverse = function(mime_type) {
	let default_extension = `.bin`

	for (const entry of mime_types) {
		if (entry.mime === mime_type) {
			return "." + entry.extension
		}
	}

	return default_extension
}

export default getMimeType_impl
