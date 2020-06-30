export function $(selector) {
    
    const element = document.querySelector(selector);
    
    return element;
};

export function all$(selector) {
    
    const element = document.querySelectorAll(selector);
    
    return element;
};

export function createElement(tag, className) {
    
    const element = document.createElement(tag);
    className && element.classList.add(className);
    
    return element;
};

export function addClassName(selector, className) {
    const element = selector.classList.add(className);

    return element;
};

export function removeClassName(selector, className) {
    const element = selector.classList.remove(className)

    return element;
};

export function changeCss(selector, cssFile) {
    if(!selector) throw selector;

    const element = document.querySelector(selector);
    element.href = (cssFile)

    return this;
};