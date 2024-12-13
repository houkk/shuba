import { GetContent } from '../lib/getContent.js'

const bookNum = 1536
const startNum = 692711

const ins = new GetContent(bookNum, startNum)

;(async () => {
    await ins.getHtmlContent()
})()