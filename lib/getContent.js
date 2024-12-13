import { got } from 'got'
import { HttpsProxyAgent } from 'hpagent'
import * as cheerio from 'cheerio'
import il from 'iconv-lite'
import fs from 'fs'

const mainUrl = 'https://69shuba.cx/txt'
export class GetContent {
    constructor (bookNum, chapterNum, name) {
        this.htmlUrl = `${mainUrl}/${bookNum}/${chapterNum}`
        this.i = 1
        this.name = name
    }

    async parseHtml (htmlBody) {
        console.log(this.i++, '       ', this.htmlUrl)
        const $ = cheerio.load(htmlBody)
        // const title = $('.txtnav h1').text()
        let content = $('.txtnav').text()

        content = content.split('\n').map(v => {
            v = v.replace(/loadAdv\(.*\);/, ' ')
            return v.trim()
        }).filter(v => v).slice(2)

        const outPath = `./${this.name}.txt`
        fs.appendFileSync(outPath, content.join('\n'))
        fs.appendFileSync(outPath, '\n')
        const aTag = $('.page1 a')
        // 遍历a标签
        let nextChapterHref = null;
        aTag.each((index, element) => {
            if ($(element).text() === '下一章') {
                nextChapterHref = $(element).attr('href');
                return false; // 找到后停止遍历
            }
        });

        await new Promise (resolve => {
            setTimeout(() => resolve(1), 60)
        })
        if (nextChapterHref) {
            this.htmlUrl = nextChapterHref
            await this.getHtmlContent()
        }
    }

    async getHtmlContent () {
        const res = await got(this.htmlUrl, {
            agent: {
                https: new HttpsProxyAgent({
                    proxy: 'http://127.0.0.1:7897'
                })
            },
            https: {
                rejectUnauthorized: false
            },
            headers: {
                // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
                // 'Cookie': 'g_session=52148b47d8a259695ba9a5bc899b9c40; history_val2=1732201913@df5117da502a509d0f4179dfa67b1566; zh_choose=s; g_action=1732201913@eCY91VUkOFYRWomhkcdumnIgx2ngPWKLKCfq4NzgJUoZU3+ZaYLdc4DGZleKhAk5+V5xEPMgiDwE; jieqiHistory=54980-37611584-%25u7B2C482%25u7AE0%2520%25u8BF7%25u8001%25u7956%25u5B97-1732201911',
                // 'Upgrade-Insecure-Requests': 1
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'en,zh-CN;q=0.9,zh;q=0.8',
                'Content-Type': 'text/html',

            },
            responseType: 'buffer'
        })

        const body = il.decode(res.body, 'gbk')

        this.parseHtml(body)
    }
}