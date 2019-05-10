const fs = require('fs')
const promisify = require('util').promisify
const Handlebars = require('handlebars')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const path = require('path')
// const config = require('../config/defaultConf')

const tplPath = path.join(__dirname, '../template/dir.tpl')
const mime = require('./mime')
const compress = require('./compress')
const range = require('./range')
const isFresh = require('./cache')

// const source = fs.readFileSync(tplPath,'utf-8')
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString())

module.exports = async function (req, res, filePath, config) {
    try {
        const stats = await stat(filePath)
        if (stats.isFile()) {
            const contentType = mime(filePath)
            // 推荐使用
            //res.setHeader('Content-Type', 'text/plain')
            res.setHeader('Content-Type', contentType)
            // 添加缓存中是否存在的判断
            if (isFresh(stats, req, res)) {
                res.statusCode = 304
                res.end()
                return
            }
            let rs;
            const {code, start, end} = range(stats.size, req, res)
            if (code === 200) {
                res.statusCode = 200
                fs = fs.createReadStream(filePath)
            } else {
                res.statusCode = 206
                fs = fs.createReadStream(filePath, {start, end})
            }
            
            // let rs = fs.createReadStream(filePath)
            if (filePath.match(config.compress)) {
                rs = compress(rs, req, res)
            }
            rs.pipe(res)
            // 下面也可以
            // fs.readFile(filePath, (err,data) => {
            //     res.end(data)
            // })
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath)
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            const dir = path.relative(config.root, filePath)
            const data = {
                title: path.basename(filePath),
                // dir: path.relative(config.root, filePath),
                dir: dir ? `/${dir}` : '',
                files: files.map(file => {
                    return {
                        file,
                        //icon: require('../images/folider-img.png')
                        icon:mime(file)
                    }
                })
                //files
            }
            res.end(template(data))
            // res.end(files.join(','))
            // fs.readdir(filePath,(err, files) => {
            //     res.statusCode = 200
            //     res.setHeader('Content-Type', 'text/plain')
            //     res.end(files.join(','))
            // })
        }
    } catch (ex) {
        console.log(ex)
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end(`${filePath} is not a directory or file`)
    }
}