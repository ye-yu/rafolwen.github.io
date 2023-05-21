import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.join(__dirname, "build")

if (!fs.existsSync(buildPath)) {
  console.error(":: No build directory is found. Exiting!")
  process.exit(1)
}

exec("scp -r build centos@51.79.248.35:/home/centos/raflie.cc")