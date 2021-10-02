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
    const hd=Array.from(document.querySelectorAll('#mtab tr:nth-child(1) th'))
    numCols.forEach(function(item) {
        var col=hd.find(el => el.textContent === item);
        if(col){
            col.setAttribute("data-tsorter","numeric");
        }
    })
    
    // http://www.terrill.ca/sorting/
    // Make it sortable
    const sorter = tsorter.create('demo-table')
}
