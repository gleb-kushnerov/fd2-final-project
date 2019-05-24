import {Page} from "../../scripts/page";

export class Features extends Page {
    async resolve () {
        return {
            template: await fetch(require('./features-page.html')).then(res => res.text()),
            image1: await this.loadImage('assets/images/download-google-play.png'),
            image2: await this.loadImage('assets/images/download-app-store.png'),
            image3: await this.loadImage('assets/images/download-phone.png')
        };
    }

    async render () {
        let page = document.createElement('div');
        page.innerHTML = await this.resolvedData.template;
        return page;
    }

    afterRender() {
        let googleLinkEl = document.getElementById('google-play-link'),
            appstoreLinkEl = document.getElementById('appstore-link'),
            imageContainerEl = document.getElementById('download-image-container');
        googleLinkEl.append(this.resolvedData.image1);
        appstoreLinkEl.append(this.resolvedData.image2);
        imageContainerEl.append(this.resolvedData.image3);
    }
}