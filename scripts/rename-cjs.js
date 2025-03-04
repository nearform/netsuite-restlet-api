import fs from 'fs'
import path from 'path'

const distDir = 'dist/cjs'

function renameJsToCjs(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      renameJsToCjs(fullPath)
    } else if (file.endsWith('.js')) {
      const newPath = fullPath.replace(/\.js$/, '.cjs')
      fs.renameSync(fullPath, newPath)
    }
  })
}

renameJsToCjs(distDir)
