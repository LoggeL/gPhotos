const albumID = window.location.pathname

fetch('api/album' + albumID)
  .then((response) =>
    response.json().then((pictures) => {
      const imageData = pictures.map((picture) => ({
        filename: picture.url,
        aspectRatio: picture.width / picture.height,
      }))

      new Pig(imageData, {
        spaceBetweenImages: 5,
        urlForSize: function (filename, size) {
          if (size == '20') return '/assets/thumb.svg'
          return filename + '=w' + parseInt(size * window.devicePixelRatio)
        },
        onClickHandler: function (filename) {
          const width = pictures.find(
            (picture) => picture.url === filename
          ).width
          window.open(filename + '=w' + width, '_blank')
        },
      }).enable()
    })
  )
  .catch(console.error)
