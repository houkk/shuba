import { GetContent } from '../lib/getContent.js'

const [ bookNum, startNum ] = process.argv.slice(2)

// const bookNum = 74638
// const startNum = 38724470

const ins = new GetContent(bookNum, startNum)

;(async () => {
    console.log(bookNum, startNum)
    // await ins.getHtmlContent()
})()