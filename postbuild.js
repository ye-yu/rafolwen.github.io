import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.join(__dirname, "build/static/media")

if (!fs.existsSync(buildPath)) {
  console.error(":: No build directory is found. Exiting!")
  process.exit(1)
}


imagemin(
  [path.join(buildPath, "*.jpg")],
  {
    destination: buildPath,
    plugins: [
      imageminJpegtran({
        arithmetic: true,
        progressive: true,
      }),
    ]
  }
).then(result => {
  console.log(":: Minified files:")
  result.forEach(file => console.log("::    -", file.destinationPath))
  process.exit()
}).catch(err => {
  console.error(":: Error at imagemin:", err)
  process.exit(1)
})