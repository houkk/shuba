import { GetContent } from '../lib/getContent.js'

const bookNum = 51584
const startNum = 33693161

const ins = new GetContent(bookNum, startNum)

;(async () => {
    await ins.getHtmlContent()
})()