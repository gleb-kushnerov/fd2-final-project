import {Page} from "../../../scripts/page.js";

export class SuccessPage extends Page{
    async resolve () {
        return {
            template: await fetch('pages/order-now/wait-for-your-cab/wait-for-your-cab.html').then(res => res.text())
        };
    }

    async render () {
        let page = document.createElement('div');
        page.innerHTML = await this.resolvedData.template;
        return page;
    }
}