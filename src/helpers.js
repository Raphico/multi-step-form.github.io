/**
 * Inserts content into the specified element
 * @param {HTMLElement} element
 * @param {("afterbegin" | "beforeend" | "afterend" | "beforebegin")} position
 * @param {string} content
 */
export function insertHTML(element, position, content) {
    element.insertAdjacentHTML(position, content);
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
