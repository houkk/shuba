import { GetContent } from '../lib/getContent.js'

const bookNum = 76815
const startNum = 38790752

const ins = new GetContent(bookNum, startNum)

;(async () => {
    await ins.getHtmlContent()
})()