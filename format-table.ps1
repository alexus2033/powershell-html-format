$ReportData = [System.Collections.ArrayList]@()

# Make some random data
#  for a 100 row table
for($x=1;$x -lt 101;$x++)
{
    # Create a string between 10 and 50 characters
    $limit=(Get-random -Minimum 10 -Maximum 50)
    $a=""
    $word=""
    # Let’s build the random content
    for($y=0;$y -lt $limit;$y++)
    {
        # We’re building a content of pure ASCII data
        $a=$a+[char][byte]((Get-Random -Minimum 32 64)+32)

    }
    $amount=(Get-Random -Minimum -99.9 -Maximum 99.9)
    $word=("wild","mad","small","heroic","minimal","elegant","clean","rotten","round","square","blue" | Get-Random)
    $word+=" "+("player","forest","speaker","politican","manager","magician","hawk","dog","sound","fox" | Get-Random)
    $ReportData.Add((New-Object PsObject -Property @{Id=$x;Description=$word;Amount=$amount;Data=$a;})) > $null;
}

$ReportHeader ="<div class='header'><h1>Sortable Report from PowerShell</h1></div>"
$ReportFooter = "<script src=tsorter.min.js></script>"
$ReportFooter += "<script src=demo.js></script>"

# switch to script-folder
Push-Location $PSScriptRoot

# Create an HTML table and write it to "demo.html"
$ReportData |  Select-Object "Id","Description","Amount","Data" | ConvertTo-Html -CSSUri demo.css -title "Sortable Table from PowerShell" -PreContent "$($ReportHeader)" -PostContent "$($ReportFooter)" | Out-File -Encoding utf8 "demo.html"
