import {Page} from "../../../scripts/page";

export class SuccessPage extends Page{
    async resolve () {
        return {
            template: await fetch(require('./wait-for-your-cab-page.html')).then(res => res.text())
        };
    }

    async render () {
        let page = document.createElement('div');
        page.innerHTML = await this.resolvedData.template;
        return page;
    }
}