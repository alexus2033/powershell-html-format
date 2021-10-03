# Powershell generated html-Table with dynamic sort-function

Full Details about tsorter: 
[http://www.terrill.ca/sorting/](http://www.terrill.ca/sorting/)

## Create an HTML table

[ConvertTo-Html](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/convertto-html) makes it easy to format your data for every website. The downside is that the output has a fixed format. But you can use javascript to change the sort-order with a click on the corresponding header.

````
$ReportFooter = "<script src=tsorter.min.js></script>"
$ReportFooter += "<script src=demo.js></script>"

# Create an HTML table and write it to "demo.html"
$ReportData | ConvertTo-Html -CSSUri demo.css -title "Sortable Table from PowerShell" -PreContent "$($ReportHeader)" -PostContent "$($ReportFooter)" | Out-File -Encoding utf8 "demo.html"
````

## Specifying Data Types

Different data types require different comparisons. Numbers in particular must be compared as numbers and not strings. To aid the script we can hint at the data type by specifying a `data-tsorter` attribute on the table header cell for each column. 

````
window.onload = () => {
    ...
    // Mark the named columns as numeric so it sorts correctly
    let numCols = ['Id', 'Amount'] //add more Names here!
    ...
    // Provide the table ID and the initially sorted column (optional)
    const sorter = tsorter.create('demo-table', initialSortColumn)
}
````

If the `data-tsorter` attribute is omitted it will default to string comparison. 

## Built in Data Types

| type | description  |
|-----|---|
|  numeric  | Treats the table cell value as an integer or float  |
| link | Parses the text content of a link tag inside the table cell |
| input | Parses an input tag's value inside the table cell |
| date-time | useful for formatted date/time values like "dd.mm.yyyy" |
| default | by default the textContent of the table cell is used and compared as text |

## Custom Data Accessor

It is possible to define your own data accessors. This is particularly useful when there is custom HTML inside a table cell. 

```
 var sorter = tsorter.create('table-id', 0, {
     'image-number': function(row){  
         return parseFloat( this.getCell(row).childNodes[1].nodeValue, 10 );
     }
});
```

In the above example the 'image-number' type is now available to be used as a `data-tsorter` attribute value. It will access the text node that follows an image tag inside a cell. Examples are available at [jsfiddle](https://jsfiddle.net/und6tfez/2/) or [http://www.terrill.ca/sorting/table_sort_example.html](http://www.terrill.ca/sorting/table_sort_example.html).
