# Prepare a collection for random test-data...
$ReportData = [System.Collections.ArrayList]@()

# ...for a 100 row table
for($x=1;$x -lt 101;$x++)
{
    # Create a string between 10 and 40 characters
    $limit=(Get-random -Minimum 10 -Maximum 40)
    $a=""
    $words=""
    # Let’s build the random content
    for($y=0;$y -lt $limit;$y++)
    {
        # We’re building a content of pure ASCII data
        $a=$a+[char][byte]((Get-Random -Minimum 32 64)+32)
    }
    # Create numeric values
    $amount=(Get-Random -Minimum -88.9 -Maximum 88.9)
    # Create some random dates
    $date= "{0:D1}.{1:D2}.{2:D2}" -f (Get-Random -Minimum 1 -Maximum 28),(Get-Random -Minimum 1 -Maximum 12),(Get-Random -Minimum 1996 -Maximum 2023)
    # Create some nice words
    $words=("wild","mad","small","heroic","minimal","elegant","clean","rotten","round","square","blue","fantastic" | Get-Random)
    $words+=" "+("player","forest","speaker","politican","manager","magician","hawk","dog","sound","fox" | Get-Random)
    # Create a local IP-Address
    $ip= "{0:D}.{1:D}.{2:D}.{3:D}" -f (10,172,192 | Get-Random),(Get-Random -Minimum 120 -Maximum 168),
                                      (Get-Random -Minimum 0 -Maximum 255),(Get-Random -Minimum 0 -Maximum 255)
    # put one row together...                                  
    $ReportData.Add((New-Object PsObject -Property @{Id=$x;Date=$date;Description=$words;Amount=$amount;Address=$ip;Data=$a;})) > $null;
}

$ReportHeader ="<div class='header'><h1>Sortable Report from PowerShell</h1></div>"
$ReportFooter = "<script src=tsorter.min.js></script>"
$ReportFooter += "<script src=demo.js></script>"

# switch to script-folder
Push-Location $PSScriptRoot

# Create an HTML table and write it to "demo.html"
$ReportData |  Select-Object "Id","Date","Description","Amount","Address","Data" | ConvertTo-Html -CSSUri demo.css -title "Sortable Table from PowerShell" -PreContent "$($ReportHeader)" -PostContent "$($ReportFooter)" | Out-File -Encoding utf8 "demo.html"
