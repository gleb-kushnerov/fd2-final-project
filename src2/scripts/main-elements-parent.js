export class MainElementsParent {
    async loadContent(url, responseType) {
        return await fetch(url)
            .then(response => response[responseType]())
            .then(result => result)
    }
}
