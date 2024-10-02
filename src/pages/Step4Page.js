export class Step4Page extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const pageTemplate = document.getElementById("step4PageTemplate");
        const pageContent = pageTemplate.content.cloneNode(true);
        this.appendChild(pageContent);
    }
}
