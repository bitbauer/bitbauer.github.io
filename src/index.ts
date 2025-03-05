import { Terminal } from './terminal'

var welcome = new Terminal('../welcome.txt', 'console', 1);

var timer = setInterval('t();', 30);
function t() {
    welcome.addText(0);
    
    if (welcome.index >= welcome.text.length) {
        clearInterval(timer);
    }
}

document.onkeydown = function (e) {
    if (e.charCode == 27) {
        // fastforward text 
        welcome.index = welcome.text.length;
    }
}
