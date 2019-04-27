import {Page} from "../../scripts/page.js";

export class Home extends Page {
    async resolve () {
        return {
            template: await fetch('pages/home/home.html').then(res => res.text()),
            image: await this.loadImage('assets/images/header-car.jpg')
        };
    }

    async render () {
        let homePage = document.createElement('div');
        homePage.innerHTML = await this.resolvedData.template;
        return homePage;
    }

    afterRender() {
        let headerEl = document.getElementById('img-container');
        headerEl.append(this.resolvedData.image);
    }

}