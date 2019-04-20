'use strict';

class Reviews {
    reviewsEl = document.createElement('section');
    clients = new ReviewsClients();
    call = new ReviewsCall();
    constructor() {
        this.reviewsEl.append(this.clients.clientsEl);
        this.reviewsEl.append(this.call.callEl);
    }
}


class ReviewsClients extends MainElementsParent {
    clientsEl = document.createElement('section');
    constructor() {
        super();
        this.clientsEl.classList.add('clients');
        this.loadContent('content/reviews-clients-content.html', 'text')
            .then(result => this.clientsEl.insertAdjacentHTML('afterbegin', result));
    }
}


class ReviewsCall extends MainElementsParent {
    callEl = document.createElement('section');
    constructor() {
        super();
        this.callEl.classList.add('call');
        this.loadContent('content/review-call-content.html', 'text')
            .then(result => this.callEl.insertAdjacentHTML('afterbegin', result));
    }
}
