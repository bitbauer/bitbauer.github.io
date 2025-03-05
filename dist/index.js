var Terminal = {
    text: '',
    accessCountimer: null,
    index: 0,
    speed: 2,
    file: '',
    init: function () {
        accessCountimer = setInterval(function () {
            Terminal.updLstChr();
        }, 500);

        $.get(Terminal.file, function (data) {
            Terminal.text = data;
            Terminal.text = Terminal.text.slice(0, Terminal.text.length - 1);
        });
    },

    content: function () {
        return $('#console').html();
    },

    write: function (str) {
        $('#console').append(str);
        return false;
    },

    addText: function (key) {
            var cont = Terminal.content();
            if (cont.substring(cont.length - 1, cont.length) == '|')
                $('#console').html(
                    $('#console')
                        .html()
                        .substring(0, cont.length - 1),
                );
            if (key.keyCode != 8) {
                Terminal.index += Terminal.speed;
            } else {
                if (Terminal.index > 0) Terminal.index -= Terminal.speed;
            }
            var text = Terminal.text.substring(0, Terminal.index);
            var rtn = new RegExp('\n', 'g');

            $('#console').html(text.replace(rtn, '<br/>'));
            window.scrollBy(0, 50);

    },

    updLstChr: function () {
        var cont = this.content();

        if (cont.substring(cont.length - 1, cont.length) == '|')
            $('#console').html(
                $('#console')
                    .html()
                    .substring(0, cont.length - 1),
            );
        else this.write('|'); // else write it
    },
};

Terminal.speed = 2;
Terminal.file = '../welcome.txt';
Terminal.init();

var timer = setInterval('t();', 30);
function t() {
    Terminal.addText({keyCode: 0});

    if (Terminal.index > Terminal.text.length) {
        clearInterval(timer);
    }

}

document.onkeydown = function (e) {
    if (e.keyCode == 27) {
        // fastforward text 
        Terminal.index = Terminal.text.length;
    }
}