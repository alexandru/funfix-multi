#!/usr/bin/env node

const process = require('process')
const path = require('path')
const fs = require('fs-extra')

const commonDir = path.dirname(process.argv[1])
const rootDir = path.join(commonDir, "..", "packages")

const toCopy = [
  "tsconfig.json",
  ".babelrc",
  "rollup.config.js",
  "tslint.json",
  ".flowconfig"
]

for (const p of fs.readdirSync(rootDir)) {
  const dir = path.join(rootDir, p)

  for (const file of toCopy) {
    const dst = path.join(dir, file)

    if (!fs.existsSync(dst)) {
      const src = path.join("..", "..", "common", file)
      console.info(`Creating symlink ${p}/${file} to ${file}`)
      fs.copySync(src, dst)
    }
  }

  const dst = path.join(dir, "package.json")
  const srcJSON = JSON.parse(fs.readFileSync(path.join(commonDir, "package.json"), "utf-8"))
  const dstJSON = JSON.parse(fs.readFileSync(dst, "utf-8"))
  for (const key of Object.keys(srcJSON)) dstJSON[key] = srcJSON[key]

  console.info(`Updating: ${dst}`)
  fs.writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify(dstJSON, null, 2),
    "utf-8"
  )
}
