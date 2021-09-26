const albumInput = document.getElementById('albumInput');

albumInput.addEventListener('keyup', function (e) {
    const url = new URL(e.target.value)
    if (url && url.host == "photos.app.goo.gl" && url.pathname.startsWith('/')) {
        const albumId = url.pathname.replace('/', '')
        window.location.href = `/${albumId}`
    }
})