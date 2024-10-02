export class Step3Page extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const pageTemplate = document.getElementById("step3PageTemplate");
        const pageContent = pageTemplate.content.cloneNode(true);
        this.appendChild(pageContent);
    }
}
