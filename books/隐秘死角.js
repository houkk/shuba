import { GetContent } from '../lib/getContent.js'

const bookNum = 48166
const startNum = 32023003

const ins = new GetContent(bookNum, startNum)

;(async () => {
    await ins.getHtmlContent()
})()