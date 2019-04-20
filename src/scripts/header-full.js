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
        this.loadContent('content/logo-content.html', 'text')
            .then(result => this.logoEl.innerHTML = result);
        this.logoEl.addEventListener('click', this);
    }

    handleEvent(event) {
        let logo = event.target.closest('.logo');
        if (logo) {
            headerMainEl.innerHTML = '';
            sectionMainContentEl.innerHTML = '';
            headerMainEl.append(headerEl.mainContentEl);
            sectionMainContentEl.append(mainContentEl.cabInfoEl);
        }
    }
}

class HeaderNav {
    navEl = document.createElement('nav');
    ulEL = document.createElement('ul');

    constructor() {
        this.navEl.append(this.createMenu());
        this.navEl.addEventListener('click', this);
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

    handleEvent (event) {
        let liEl = event.target.closest('li');
        event.preventDefault();
        if (liEl.dataset.linkName === 'Home') {
            headerMainEl.innerHTML = '';
            sectionMainContentEl.innerHTML = '';
            headerMainEl.append(headerEl.mainContentEl);
            sectionMainContentEl.append(mainContentEl.cabInfoEl);
        } else if (liEl.dataset.linkName === 'Features') {
            sectionMainContentEl.innerHTML = '';
            headerMainEl.innerHTML = '';
            let featuresEL = new Features(),
                headerMiniEl = new HeaderMini();
            headerMainEl.append(headerMiniEl.mainContentEl);
            sectionMainContentEl.append(featuresEL.mainContentEl);
        } else if (liEl.dataset.linkName === 'Order now') {

        } else if (liEl.dataset.linkName === 'Reviews') {
            sectionMainContentEl.innerHTML = '';
            headerMainEl.innerHTML = '';
            let reviewsEL = new Reviews(),
                headerMiniEl = new HeaderMini();
            headerMainEl.append(headerMiniEl.mainContentEl);
            sectionMainContentEl.append(reviewsEL.reviewsEl);
        }
    }
}

class HeaderContent extends MainElementsParent{
    containerEl = document.createElement('div');
    imageContainerEl = document.createElement('div');

    constructor() {
        super();
        this.containerEl.classList.add('container');
        this.imageContainerEl.classList.add('img-container');
        this.loadContent('content/container-content.html', 'text')
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