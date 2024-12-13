import { GetContent } from '../lib/getContent.js'

const bookNum = 74638
const startNum = 38724470

const ins = new GetContent(bookNum, startNum)

;(async () => {
    await ins.getHtmlContent()
})()