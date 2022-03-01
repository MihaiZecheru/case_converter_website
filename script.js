window.onload = () => {

    /* TAB to autofill "the quick brown fox" */

    const textbox = document.getElementById("textbox");
    textbox.addEventListener("keydown", (event) => {
        if (event.keyCode === 9 && !textbox.value) { // keypress is TAB and there is currently no text in the box
            event.preventDefault();
            textbox.value = "The quick brown fox jumps over the lazy dog. ";
        }
    });

    /* ctrl-s for download shortcut */

    window._isCtrl = false;

    // check for ctrl keypress
    document.body.addEventListener("keydown", (event) => {
        if (event.keyCode === 17) {
            window._isCtrl = true;
        }
    });

    // check for s keypress
    document.body.addEventListener("keydown", (event) => {
        if (event.keyCode === 83 && window._isCtrl) { // ctrl and s are being pressed at the same time
            event.preventDefault();
            window._isCtrl = false;
            Handler.saveText();
        }
    });

    // check for letting go of ctrl
    document.body.addEventListener("keyup", (event) => {
        if (event.keyCode === 17) {
            window._isCtrl = false;
        }
    });
}

class Handler {
    static box = document.getElementById("textbox");

    static _updateBoxText(text) {
        this.box.value = text;
    }

    static upperCase() {
        const content = this.box.value;
        this._updateBoxText(content.toUpperCase());
    }

    static lowerCase() {
        const content = this.box.value;
        this._updateBoxText(content.toLowerCase());
    }

    static properCase() {
        const content = this.box.value.toLowerCase();
        let newText = '';
        for(let i=0;i<content.length;i++) {
            if (content[i-1] === ' ' || i === 0) {
                // is new word, capitalize letter
                newText += content[i].toUpperCase();
                continue;
            }
            newText += content[i];
        }
        this._updateBoxText(newText);
    }

    static sentenceCase() {
        const content = this.box.value.toLowerCase();
        let newText = '';
        for(let i=0;i<content.length;i++) {
            if (i === 1) {
                newText += content[i];
                continue;
            }

            if ((content[i-2] + content[i-1])  === '. ' || i === 0) {
                newText += content[i].toUpperCase();
                continue;
            }
            newText += content[i];
        }
        this._updateBoxText(newText);
    }

    static saveText () {
        const content = this.box.value;
        if (!content) { return } // no text to save
        const fileName = prompt('Name your file: ');
        if (fileName) {
            this._download(fileName, content);
        }
    }

    static _download(filename, text) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
}