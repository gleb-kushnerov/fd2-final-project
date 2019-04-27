export class Page {
    async resolve () {
    }

    async load () {
        this.resolvedData = await this.resolve();
    }

    loadImage(imageUrl) {
        return fetch(imageUrl)
            .then(response => response.blob())
            .then(blobImage => {
                let url = URL.createObjectURL(blobImage),
                    img = new Image();
                img.src = url;
                return img;
            });
    }

    beforeRender () {

    }

    afterRender () {

    }

    render () {

    }

    destroy () {
        document.body.innerHTML = '';
    }
}