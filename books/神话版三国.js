import { GetContent } from '../lib/getContent.js'

const bookNum = 51257
const startNum = 33472067

const ins = new GetContent(bookNum, startNum)

;(async () => {
    await ins.getHtmlContent()
})()