# YAPC

Yet Another CSS Preprocessor build on top of [Rework](https://github.com/reworkcss/rework).

## Installation

```
npm install -g yacp
```

## Features

- [Automatic vendor-prefixed property](https://github.com/ai/autoprefixer)
- [Rulesets binding syntax](https://github.com/morishitter/rework-rule-binding)
- [W3C-style CSS variables syntax](https://github.com/reworkcss/rework-vars)

## Example

```css
%color-danger {
  color: red;
}

.btn {
  box-shadow: 10px 10px;
  font-size: 18px;
  extends: %color-danger;
}
```

Compiled with the following command:

```
$ yacp < input.css > output.css
```

Yields:

```css
.btn {
  color: red;
}

.btn {
  -webkit-box-shadow: 10px 10px;
  box-shadow: 10px 10px;
  font-size: 18px;
}
```

## License
The MIT License (MIT)

Copyright (c) 2014 Masaaki Morishita

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
