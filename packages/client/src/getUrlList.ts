import fs from 'fs'

export const getUrlList = () => {
  const fileNameList: string[] = []
  const files = fs.readdirSync('./dist/assets')
  for (const i in files) {
    const name = `/assets/${files[i]}`
    fileNameList.push(name)
  }
  return fileNameList
}

const urlList = getUrlList()

fs.readFile(`./dist/sw.js`, { encoding: 'utf-8' }, (error, content) => {
  const newContent = content.replace('%HASHURLS%', JSON.stringify(urlList))
  fs.writeFile('./dist/sw.js', newContent, error => {
    error ? console.log(`Error: ${error}`) : console.log(`Success URLS`)
  })
})
