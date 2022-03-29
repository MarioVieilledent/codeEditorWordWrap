# codeEditorWordWrap

Based on a proposition of Charmaine Chui :

## Enable Line Numbering to any HTML Textarea
### Lightweight solution without code editor plugins

https://medium.com/weekly-webtips/enable-line-numbering-to-any-html-textarea-35e15ea320e2

# Changes

Add a listener to the textarea to detect the width change with a debounce time of 0.3 seconds
```js
let codeEditorWidth = codeEditor.offsetWidth;

let outputsize = debounce(() => {
    if (codeEditorWidth !== codeEditor.offsetWidth) {
        codeEditorWidth = codeEditor.offsetWidth;
        line_counter();
    }
}, 300);

new ResizeObserver(outputsize).observe(codeEditor);
```

Function to add for the debounce :
```js
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
```

The `line_counter` has to change a little bit :

```js
function line_counter() {
    let lines = codeEditor.value.split('\n');
    let lineCount = lines.length;
    let outarr = new Array();
    for (let x = 0; x < lineCount; x++) {
        if ((lines[x].length * 8) + 10 > codeEditorWidth) {
            outarr.push(x + 1);
            let nbWrap = Math.floor(((lines[x].length * 8) + 10) / codeEditorWidth);
            for (let y = 0; y < nbWrap; y++) {
                outarr.push(' ');
            }
        } else {
            outarr.push(x + 1);
        }
    }
    lineCounter.value = outarr.join('\n');
}
```

The part ```lines[x].length * 8``` supposes a char is 8 px width. So we need to make sure all chars in the textarea are 8px width.

```css
.lineCounter,
.textEditor {
    resize: none;
    outline: none;
    font-size: 13.333333333px
    font-family: "Courier New", Courier, monospace;
```
