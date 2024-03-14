import getMimeType from "./src/index.mjs"

// application/zip
console.log(getMimeType("test.zip"))
// application/octet-stream
console.log(getMimeType("test.tar.gz"))
// audio/mpeg
console.log(getMimeType("test.mp3"))
// application/javascript
console.log(getMimeType("test.js"))
// application/javascript
console.log(getMimeType("test.mjs"))

// .bin
console.log(getMimeType.reverse("application/octet-stream"))
// .mp3
console.log(getMimeType.reverse("audio/mpeg"))
