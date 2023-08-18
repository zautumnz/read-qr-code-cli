# read-qr-code-cli

Tiny CLI for reading QR codes.

--------

## Installation

`npm i -g read-qr-code-cli`

## Usage

```
# prints the decoded url
read-qr-code-cli some-file.png
# opens link in your browser
read-qr-code-cli -o some-file.png
# shorthand name
readqr some-file.png
```

Supported filetypes should be the same as
[JIMP](https://github.com/jimp-dev/jimp). Just a tiny wrapper around JIMP and
[jsQR](https://github.com/cozmo/jsQR). I threw this together because I'm tired
of pulling out my phone just to scan a QR code and then text the link to my
email address so I can open it up on desktop again.

[LICENSE](./LICENSE.md)
