# svg-tools
> Modify svg files and create sprite sheets directly from the command line.

## Installation
```bash
npm i -g svg-tools
```

## Use svg-tools
```bash
# print parsed SVG
svg print ./path/to/mySvg.svg
# print parsed SVG as HTML
svg print ./path/to/mySvg.svg H

# create a sprite sheet from a folder of svg files
svg sprite ./path/to/my/svg/folder C:/my/output/spite-sheet.svg
```

## Use sprite-sheets
```xml
<!--Add your sprite sheet to the DOM-->
<div style="display: none">
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
    <symbol id="axis-arrow" viewBox="0 0 24 24">
      <path d="..."></path>
    </symbol>
    <!-- ... -->
  </svg>
</div>

<!--Reference your sprites with <use> tags-->
<svg>
  <use href="#axis-arrow"></use>
</svg>
```

## Contribute
Pull requests welcome!
