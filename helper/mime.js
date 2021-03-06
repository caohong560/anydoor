const path = require('path')

const mimeTypes = {
    'doc':'application/msword',
    'docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'rtf':'application/rtf',
    'xls':'application/vnd.ms-excel	application/x-excel',
    'xlsx':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt':'application/vnd.ms-powerpoint',
    'pptx':'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'pps':'application/vnd.ms-powerpoint',
    'ppsx':'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'pdf':'application/pdf',
    'swf':'application/x-shockwave-flash',
    'dll':'application/x-msdownload',
    'exe':'application/octet-stream',
    'msi':'application/octet-stream',
    'chm':'application/octet-stream',
    'cab':'application/octet-stream',
    'ocx':'application/octet-stream',
    'rar':'application/octet-stream',
    'tar':'application/x-tar',
    'tgz':'application/x-compressed',
    'zip':'application/x-zip-compressed',
    'z':'application/x-compress',
    'wav':'audio/wav',
    'wma':'audio/x-ms-wma',
    'wmv':'video/x-ms-wmv',
    'mp3':'audio/mpeg',
    'mp2':'audio/mpeg',
    'mpe':'audio/mpeg',
    'mpeg':'audio/mpeg',
    'mpg ':'audio/mpeg',
    'rm':'application/vnd.rn-realmedia',
    'mid':'audio/mid',
    'midi':'audio/mid',
    'rmi': 'audio/mid',
    'bmp':'image/bmp',
    'gif':'image/gif',
    'png':'image/png',
    'tif': 'image/tiff',
    'tiff': 'image/tiff',
    'jpe':'image/jpeg',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'txt':'text/plain',
    'xml':'text/xml',
    'html':'text/html',
    'css':'text/css',
    'js':'text/javascript',
    'mht':'message/rfc822',
    'mhtml':'message/rfc822' 
}
module.exports = (filePath) => {
    let ext = path.extname(filePath).split('.').pop().toLowerCase();
    if (!ext) {
        ext = filePath
    }
    return mimeTypes[ext] || mimeTypes['txt']
}