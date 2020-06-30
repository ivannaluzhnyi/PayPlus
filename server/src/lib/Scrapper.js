const http = require("http");
const https = require("https");
const $ = require("cheerio")

const Scrapper = (url, options, processData, saveData) => {
    const protocol = url.indexOf('https') !== -1 ? https : http;
    const req = protocol.request(url, options, res => {
        if(res.statusCode >= 300) throw new Error('Invalid request');

        let data = ';'
        res.on('data', (chunk) => {
            data += chunk
        });
        
        res.on('end', () => {
            let result = null;
            if( res.headers['content-type'].match(/json/)) {
                result = JSON.parse(data);
            } else if(res.headers['content-type'].match(/html/)){
                result = $.load(data);
            } else{
                console.log("Another data", data)
            }
            result = processData ? processData(result) : result;

            saveData(result);
        })
    });
    return req;
};

module.exports = Scrapper;