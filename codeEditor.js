
let codeEditor = document.getElementById('codeEditor');
let lineCounter = document.getElementById('lineCounter');

let codeEditorWidth = codeEditor.offsetWidth;

let outputsize = debounce(() => {
    if (codeEditorWidth !== codeEditor.offsetWidth) {
        codeEditorWidth = codeEditor.offsetWidth;
        line_counter();
    }
}, 300);

outputsize();

new ResizeObserver(outputsize).observe(codeEditor);

codeEditor.addEventListener('scroll', () => {
    lineCounter.scrollTop = codeEditor.scrollTop;
    lineCounter.scrollLeft = codeEditor.scrollLeft;
});

/*
codeEditor.addEventListener('keydown', (e) => {
    let { keyCode } = e;
    let { value, selectionStart, selectionEnd } = codeEditor;
    if (keyCode === 9) {  // TAB = 9
        e.preventDefault();
        codeEditor.value = value.slice(0, selectionStart) + 't' + value.slice(selectionEnd);
        codeEditor.setSelectionRange(selectionStart + 2, selectionStart + 2)
    }
});
*/

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        let context = this;
        let args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function line_counter() {
    let lines = codeEditor.value.split('\n');
    let lineCount = lines.length;
    let outarr = new Array();
    for (let x = 0; x < lineCount; x++) {
        if (lines[x].length * 8 > codeEditorWidth - 10) {
            outarr.push(x + 1);
            let nbWrap = Math.floor((lines[x].length * 8) / (codeEditorWidth - 10));
            for (let y = 0; y < nbWrap; y++) {
                outarr.push(' ');
            }
        } else {
            outarr.push(x + 1);
        }
    }
    lineCounter.value = outarr.join('\n');
}

line_counter();

codeEditor.addEventListener('input', () => { });
