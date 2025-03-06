export class Terminal {
    text;
    index;
    speed;
    element;
    accessCountimer;
    constructor(text, elementId, speed) {
        this.element = document.getElementById(elementId);
        this.speed = speed;
        this.text = text;
        this.index = 0;
        this.accessCountimer = setInterval(() => {
            this.updLstChr();
        }, 500);
        console.log("TEXT:");
        console.log(this.text);
    }
    content() {
        return this.element.getHTML();
    }
    write(str) {
        this.element.append(str);
        return false;
    }
    addText(charCode) {
        const cont = this.content();
        if (cont.substring(cont.length - 1, cont.length) === '|')
            this.element.setHTMLUnsafe(this.element.getHTML().substring(0, cont.length - 1));
        if (charCode !== 8) {
            this.index += this.speed;
        }
        else {
            if (this.index > 0)
                this.index -= this.speed;
        }
        const text = this.text.substring(0, this.index);
        const rtn = new RegExp('\n', 'g');
        this.element.setHTMLUnsafe(text.replace(rtn, '<br/>'));
        window.scrollBy(0, 50);
    }
    updLstChr() {
        const cont = this.content();
        if (cont.substring(cont.length - 1, cont.length) === '|')
            this.element.setHTMLUnsafe(this.element.getHTML().substring(0, cont.length - 1));
        else
            this.write('|');
    }
}
