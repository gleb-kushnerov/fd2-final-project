
export class Router {

    constructor (routes, el) {
        this.container = el;
        this.routes = routes.map(({page, path}) => {
            return {
                page,
                path: createPathRegexp(path)
            };
        });
        this.currentPage = null;
    }

    start () {
        window.addEventListener('hashchange', this);
        this.handleHash(location.hash);
    }

    stop () {
        window.removeEventListener('hashchange', this);
    }

    handleEvent (event) {
        event.preventDefault();
        window.scrollTo(0, 0);
        this.handleHash(location.hash);
    }


    handleHash (hash) {
        let route = this.routes.find(route => route.path.test(hash));
        if (route) {
            let params = {...route.path.exec(hash).groups};
            this.startPage(route.page, params);
        }
    }


    async startPage (PageConstructor, params) {
        if (this.currentPage) {
            await this.currentPage.destroy();
        }

        this.currentPage = new PageConstructor(params);
        await this.currentPage.load();
        await this.currentPage.beforeRender();
        this.container.append(await this.currentPage.render());
        await this.currentPage.afterRender();
    }
}


function createPathRegexp (path) {
    return new RegExp(
        `^#?${
            path.split('/')
                .map(fragment => {
                    if (fragment.charAt(0) === ':') {
                        return `(?<${fragment.substring(1)}>[^/]+)`
                    } else {
                        return fragment;
                    }
                })
                .join('/')
            }$`,
        'i'
    );
}