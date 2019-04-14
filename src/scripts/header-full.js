'use strict';

class HeaderFull {
    mainContentEl = document.createElement('section');
    headerEl = document.createElement('div');
    logo = new HeaderLogo();
    nav = new HeaderNav();
    container = new HeaderContent();

    constructor() {
        this.mainContentEl.classList.add('header-full');
        this.headerEl.classList.add('header');
        this.headerEl.append(this.logo.logoEl);
        this.headerEl.append(this.nav.navEl);
        this.mainContentEl.append(this.headerEl);
        this.mainContentEl.append(this.container.containerEl);
    }
}



class HeaderLogo extends MainElementsParent{
    logoEl = document.createElement('div');
    constructor() {
        super();
        this.logoEl.classList.add('logo');
        this.loadContent('server/logo-content.html', 'text')
            .then(result => this.logoEl.innerHTML = result);
    }
}

class HeaderNav {
    navEl = document.createElement('nav');
    ulEL = document.createElement('ul');
    constructor() {
        this.navEl.append(this.createMenu());
    }
    createMenu() {
        let listArr = ['Home','Features','Order now','Reviews'];
        this.ulEL.append(listArr.reduce((fragment, el) => {
                let liEl = document.createElement('li'),
                    aEL = document.createElement('a');
                liEl.dataset.linkName = `${el}`;
                aEL.setAttribute('href', `#${el}`);
                aEL.textContent = `${el}`;
                liEl.append(aEL);
                fragment.append(liEl);
                return fragment;
            }, document.createDocumentFragment())
        );
        return this.ulEL;
    }
    // handleEvent (event) {
    //     switch (event.type) {
    //         case 'click':
    //             if (this.logoEl) {
    //                 console.log(event.target);
    //             } else if (event.target.closest('li').dataset.linkName === 'Features') {
    //                 event.preventDefault();
    //                 sectionMainContentEl.textContent = '';
    //                 featuresEl = new Features();
    //                 sectionMainContentEl.append(featuresEl.mainContentEl);
    //             }
    //     }
    // }
}


class HeaderContent extends MainElementsParent{
    containerEl = document.createElement('div');
    imageContainerEl = document.createElement('div');

    constructor() {
        super();
        this.containerEl.classList.add('container');
        this.imageContainerEl.classList.add('img-container');
        this.loadContent('server/container-content.html', 'text')
            .then(result => this.containerEl.insertAdjacentHTML('afterbegin', result));
        this.containerEl.append(this.imageContainerEl);
        this.loadContent('img/header-car.jpg', 'blob')
            .then(blobImage => {
                let url = URL.createObjectURL(blobImage),
                    img = new Image();
                img.src = url;
                this.imageContainerEl.append(img);
            })
    }
}