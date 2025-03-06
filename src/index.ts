import { Terminal } from './terminal.js'

var text = await fetch('../welcome.txt').then(response => response.text());
var welcome = new Terminal(text, 'console', 1);

var interval = 30;
var timer = setInterval(
    () => {
        welcome.addText(0);
    
        if (welcome.index >= welcome.text.length) {
            clearInterval(timer);
        }
    },
    interval);

document.onkeydown = function (e) {
    if (e.charCode == 27) {
        // fastforward text 
        welcome.index = welcome.text.length;
    }
}