import {Page} from "../../scripts/page.js";

export class Reviews extends Page{
    async resolve () {
        return {
            template: await fetch('pages/reviews/reviews.html').then(res => res.text()),
            image1: await this.loadImage('assets/images/clients-user-avatar.png'),
            image2: await this.loadImage('assets/images/clients-user-avatar.png'),
        };
    }

    async render () {
        let page = document.createElement('div');
        page.innerHTML = await this.resolvedData.template;
        return page;
    }

    afterRender() {
        let avatarContainer1El = document.getElementById('avatar-container-1'),
            avatarContainer2El = document.getElementById('avatar-container-2');
        avatarContainer1El.append(this.resolvedData.image1);
        avatarContainer2El.append(this.resolvedData.image2);
    }
}