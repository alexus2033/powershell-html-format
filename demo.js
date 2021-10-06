window.onload = () => {
    // Find the table
    const dataTable = document.querySelector('table')

    // Give it an ID so it's easier to work with for CSS or subsequent JS
    dataTable.id = 'demo-table'

    // Move the first row into a THEAD element that PowerShell doesn't add but is necessary for sorting
    const headerRow = dataTable.querySelector('tr:nth-child(1)')
    const thead = document.createElement('thead')
    thead.appendChild(headerRow)
    dataTable.prepend(thead)

    // Mark the named columns as numeric so it sorts correctly
    let numCols = ['Id', 'Amount'] //add more Names here!
    const hd=Array.from(document.querySelectorAll('#demo-table tr:nth-child(1) th'))
    numCols.forEach(function(item) {
        var col=hd.find(el => el.textContent === item);
        if(col){
            col.setAttribute("data-tsorter","numeric");
        }
    })
    var col=hd.find(el => el.textContent === 'Address');
    if(col){
        col.setAttribute("data-tsorter","ip");
    }
    var col=hd.find(el => el.textContent === 'Date');
    if(col){
        col.setAttribute("data-tsorter","date-time");
    }

    // http://www.terrill.ca/sorting/
    // Make ip-addresses sortable
    tsorter.create('demo-table', 0, {
        'ip': function(row){ 
        var ip =  this.getCell(row).firstChild.nodeValue.toLowerCase();
        return ip.split(".").map(function(x) {
        var s = "000" + x; //fill with leading zeros
        return s.substr(s.length-3);
            }).join(".");
        }
    })
}
