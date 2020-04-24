```js
//Get data from Enum on discogs
var res= {}
;[...temp2.querySelectorAll('a')].forEach(x => { 
    const urlParams = new URLSearchParams(x.href)

    res[x.querySelector('.link_text').innerText.replace(/(\s|\-|\&|\_|\/|,|\'|\.)/g, '').toUpperCase()] = urlParams.get('format')
})
```