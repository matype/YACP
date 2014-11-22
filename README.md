[![NPM](https://nodei.co/npm/yacp.png)](https://nodei.co/npm/yacp/)

#YACP  [![Build Status](https://travis-ci.org/morishitter/YACP.svg)](https://travis-ci.org/morishitter/yacp) [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/morishitter/YACP?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Yet Another CSS Preprocessor build on top of [Rework](https://github.com/reworkcss/rework).

## Installation

```
$ npm install -g yacp
```

when use in HTML:

```
$ bower install client-yacp
```

## Features

- [Automatic vendor-prefixed property](https://github.com/ai/autoprefixer)
- [Rulesets binding syntax](https://github.com/morishitter/rework-rule-binding)
- [Inherit other rules more safely](https://github.com/morishitter/rework-extend-validator)
- [W3C-style CSS variables syntax](https://github.com/reworkcss/rework-vars)
- [Support `calc()`, a feature to do simple calculations](https://github.com/reworkcss/rework-calc)
- [Read and inline css via `@import`](https://github.com/reworkcss/rework-import)

## Example

```css
/* Import your other CSS files */
@import url("foo.css")

/* Define variables in W3C syntax */
:root {
  --font-lg: 18px;
}

/* Placeholder selector for `extend` */
%att {
  color: red;
  font-weight: normal;
}

.attBox {
  extend: %att; /* Extend `%att` */
  box-shadow: 5px 5px;
  font-size: var(--font-lg); /* Use variable `--font-lg` */
  padding: 5px 10px;
}
```

Compiled with the following command:

```
$ yacp input.css output.css
```

Yields:

```css
/* Expand foo.css */
.foo {

}

/* Inherited in `.attBox` */
.attBox {
  color: red;
  font-weight: normal;
}

.attBox {
  -webkit-box-shadow: 5px 5px; /* Automatically added vendor prefix */
  box-shadow: 5px 5px;
  font-size: 18px; /* Expand the variable */
  padding: 5px 10px;
}
```

Show help:

```
$ yacp -h
```

```
Usage: yacp [options]

Options:

  -c, --compress    use output compression
  -w, --whitespace  use whitespace syntax like Stylus
  -V, --versions    output the version number
  -h, --help        output usage information
```

## Option projects

- [grunt-yacp](https://github.com/morishitter/grunt-yacp)

## License
The MIT License (MIT)

Copyright (c) 2014 Masaaki Morishita
