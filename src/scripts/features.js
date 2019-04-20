'use strict';

class Features{
    mainContentEl = document.createElement('section');
    features = new FeaturesList();
    download = new FeaturesDownload();
    constructor() {
        this.mainContentEl.append(this.features.featuresListEL);
        this.mainContentEl.append(this.download.featuresDownloadEl);
    }
}


class FeaturesList extends MainElementsParent {
    featuresListEL = document.createElement('section');
    containerEl = document.createElement('div');
    buttonEl = document.createElement('button');
    constructor() {
        super();
        this.featuresListEL.classList.add('features');
        this.containerEl.classList.add('container');
        this.buttonEl.classList.add('btn');
        this.featuresListEL.append(this.containerEl);
        this.loadContent('content/features-content.html', 'text')
            .then(result => this.containerEl.insertAdjacentHTML('afterbegin', result));
        this.buttonEl.setAttribute('type', 'button');
        this.buttonEl.textContent = 'Book a cab';
        this.containerEl.append(this.buttonEl);
    }
}


class FeaturesDownload extends MainElementsParent {
    featuresDownloadEl = document.createElement('section');
    containerEl = document.createElement('div');
    constructor() {
        super();
        this.featuresDownloadEl.classList.add('download');
        this.containerEl.classList.add('container');
        this.featuresDownloadEl.append(this.containerEl);
        this.loadContent('content/features-download-content.html', 'text')
            .then((result) => {
                this.containerEl.insertAdjacentHTML('afterbegin', result);
                this.googlePlaylinkEl = document.getElementById('google-play-link');
                this.appstorelinkEl = document.getElementById('appstore-link');
                this.downloadMainContent = document.getElementById('download-image-container');
            });
        this.loadContent('img/download-google-play.png', 'blob')
            .then(blobImage => {
                let img = new Image();
                img.src = URL.createObjectURL(blobImage);
                this.googlePlaylinkEl.append(img);
            });
        this.loadContent('img/download-app-store.png', 'blob')
            .then(blobImage => {
                let img = new Image();
                img.src = URL.createObjectURL(blobImage);
                this.appstorelinkEl.append(img);
            });
        this.loadContent('img/download-phone.png', 'blob')
            .then(blobImage => {
                let img = new Image();
                img.src = URL.createObjectURL(blobImage);
                this.downloadMainContent.append(img);
            });
    }
}