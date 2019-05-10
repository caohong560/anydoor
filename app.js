const http = require('http')
const chalk = require('chalk')
const path = require('path')
const conf = require('./config/defaultConf')
const route = require('./helper/route')
const openUrl = require('./helper/openUrl')

class Server {
    constructor (config) {
        this.conf = Object.assign({}, conf, config)
    }
    start () {
        const server = http.createServer((req,res) => {
            const url = req.url;
            const filePath = path.join(this.conf.root, url)
            route(req, res, filePath, this.conf)
            // fs.stat(filePath,(err, stats) => {
            //     if (err) {
            //         res.statusCode = 404
            //         res.setHeader('Content-Type', 'text/plain')
            //         res.end(`${filePath} is not a directory or file`)
            //         return;
            //     }
                
            // })
        })
        
        server.listen(this.conf.port,this.conf.hostname, () => {
            const addr = `http://${this.conf.hostname}:${this.conf.port}`
            console.log(`Server started at ${chalk.green(addr)}`)
            openUrl(addr)
        })
    }
}
module.exports = Server