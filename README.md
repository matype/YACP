[![NPM](https://nodei.co/npm/yacp.png)](https://nodei.co/npm/yacp/)

#YACP  [![Build Status](https://travis-ci.org/morishitter/YACP.svg)](https://travis-ci.org/morishitter/YACP) [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/morishitter/YACP?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Yet Another CSS Preprocessor.

But, YACP is only CSS Preprocessor can write more maintenable code.

## Installation

```
$ npm install -g yacp
```

when use in HTML:

```
$ bower install client-yacp
```


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

## Features

- [Automatic vendor-prefixed property](https://github.com/ai/autoprefixer)
- [Rulesets binding syntax](https://github.com/morishitter/rework-rule-binding)
- [Inherit other rules more safely](https://github.com/morishitter/rework-extend-validator)
- [W3C-style CSS variables syntax](https://github.com/reworkcss/rework-vars)
- [Support `calc()`, a feature to do simple calculations](https://github.com/reworkcss/rework-calc)
- [Read and inline css via `@import`](https://github.com/reworkcss/rework-import)

### Bind ruleset syntax

YACP provide [Bind ruleset syntax](https://github.com/morishitter/rework-rule-binding/).

Selectors rounded by `()` cannot cascade.

Using this feature, you can define **encapsulated** ruleset.

```css
(.btn) {
  background-color; #4dac26;
  border: solid 1px #2c9700;
  color: #fff;
  font-size: 16px;
  padding: 12px 8px;
}

/* Error */
.btn {
  padding: 15px 10px;
}
/* Error */
(.btn) {
  padding: 15px 10px;
}
```

### Inherit other rulesets safely

One of fault of existin CSS Preprocessor is compiling any code which don't have syntax error.

This is 'dangerous' inheritance code (Sass):

```css
.btn {
  border-radius: 5px;
  color: #fff;
  padding: 6px 12px;
}

.btn-success {
  @extend .btn;
  background-color: #4dac26;
}

...

.btn {
  padding: 8px 16px;
}
```

Yields:

```css
.btn, .btn-success {
  border-radius: 5px;
  color: #fff;
  padding: 6px 12px;
}

.btn-success {
  background-color: #4dac26;
}

...

.btn, .btn-success {
  padding: 8px 16px;
}
```

When overwrite `.btn`, `.btn-success` is overwrote too, and it may cause unexpected result.

But, [YACP's inheritance is safe](https://github.com/morishitter/rework-extend-validator). You can use with `extend(s)` or `inherit(s)` property.

1. Must use the placeholder selector (`%`). The Ruleset defined with placeholder selector don't output as CSS code.

2. YACP's placeholder selector cannot cascade.

3. If inherited selectors have same properties, run error.

Ex (1, 2):

```css
%btn {
  border-radius: 5px;
  color: #fff;
  padding: 6px 12px;
}

.btn-success {
  extend: %btn;
  background-color: var(--color-green);
}

/* Error */
%btn {
  padding: 8px 16px;
}
```

Ex (3):

```css
%foo {
  font-size: 16px;
  padding: 5px 10px;
}

%bar {
  color: #fff;
  font-size: 14px;
}

.baz {
  /* Error */
  extend: %foo;
  extend: %bar;
}
```

Using this feature, you can define **private** (cannot overwrite and refer from only YACP code) ruleset.


## Compile Options

```
$ yacp --help
```

```
Usage: yacp [options]

Options:

  -c, --compress    use output compression
  -s, --strict      use strict mode compile
  -w, --whitespace  use whitespace syntax like Stylus
  -V, --versions    output the version number
  -h, --help        output usage information
```

### strict mode

YACP's strict mode allow only class and pseudo-elements selector.

Following selectors cannot compile.

Ex:

```css
#id {}

div {}

.class .nested {}

p.class {}
```

and prohibit `!important`.

```css
.class {
  /* Error */
  padding: 0 !important;
}
```

Using this option, you can keep [specificity](http://www.w3.org/TR/css3-selectors/#specificity) constant, so its code will be more maintenable.

### whitespace mode

Using with [css-whitespace](https://github.com/reworkcss/css-whitespace).


## Option projects

- [grunt-yacp](https://github.com/morishitter/grunt-yacp)

## License
The MIT License (MIT)

Copyright (c) 2014 Masaaki Morishita
