export class Step1Page extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const pageTemplate = document.getElementById("step1PageTemplate");
        const pageContent = pageTemplate.content.cloneNode(true);
        this.appendChild(pageContent);
    }
}
