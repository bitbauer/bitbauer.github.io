export class Terminal {
    text: string;
    index: number;
    speed: number;
    element: HTMLElement;
    accessCountimer: number;

    constructor(text: string, elementId: string, speed: number) {
        this.element = document.getElementById(elementId)!;
        this.speed = speed;
        this.text = text;
        this.index = 0;

        this.accessCountimer = setInterval(() => {
            this.updLstChr();
        }, 500);

        console.log("TEXT:");
        console.log(this.text);
    }

    content(): string {
        return this.element.getHTML() as string;
    }

    write(str: string): boolean {
        this.element.append(str);
        return false;
    }

    addText(charCode: number): void {
        const cont: string = this.content();
        
        if (cont.substring(cont.length - 1, cont.length) === '|') 
            this.element.setHTMLUnsafe(
                this.element.getHTML().substring(0, cont.length - 1),
            );
            
        if (charCode !== 8) {
            this.index += this.speed;
        } else {
            if (this.index > 0) 
                this.index -= this.speed;
        }

        const text: string = this.text.substring(0, this.index);
        const rtn: RegExp = new RegExp('\n', 'g');

        this.element.setHTMLUnsafe(text.replace(rtn, '<br/>'));
        window.scrollBy(0, 50);
    }

    updLstChr(): void { 
        const cont: string = this.content();

        if (cont.substring(cont.length - 1, cont.length) === '|') 
            this.element.setHTMLUnsafe(
                this.element.getHTML().substring(0, cont.length - 1),
            );
        else 
            this.write('|'); 
    }
}