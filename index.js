// Express
const express = require('express')
const compression = require('compression')
const app = express()
app.use(compression())
app.use(express.static('webview'))

// Mem Cache
const mcache = require('memory-cache')

// Google Photos
const gPhotos = require('google-photos-album-image-url-fetch');

// Configs
const port = 8080

// Landing Route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/webview/index.html');
})

// Album Frontend
app.get('/:albumID', (req, res) => {
    res.sendFile(__dirname + '/webview/album.html');
})

// Album Backend
app.get('/api/album/:albumID', (req, res) => {
    const albumID = req.params.albumID
    const cacheResponse = mcache.get(albumID)
    if (cacheResponse) return res.status(200).json(cacheResponse)
    gPhotos.fetchImageUrls('https://photos.app.goo.gl/' + albumID).then(images => {
        mcache.put(albumID, images, 1000 * 60 * 60)
        res.status(200).json(images)
    }).catch(err => {
        res.json(err)
    })
})

// Start Server
app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})