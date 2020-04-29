
$ReportData = [System.Collections.ArrayList]@()

# Make some random data
#  for a 100 row table
for($x=1;$x -lt 101;$x++)
{
    # Create a string between 10 and 50 characters
    $limit=(Get-random -Minimum 10 -Maximum 50)
    $a=""
    # Let’s build the random content
    for($y=0;$y -lt $limit;$y++)
    {
        # We’re building a content of pure ASCII data
        $a=$a+[char][byte]((Get-Random 64)+32)

    }
    $ReportData.Add((New-Object PsObject -Property @{Id=$x;Data=$a;})) > $null;
}

$ReportHeader ="<div class='header'><h1>PowerShell Report Formatting</h1></div>"
$ReportFooter = "<script src=tsorter.min.js></script><script src=demo.js></script>"
# Create an HTML report
$ReportData |  Select-Object "Id","Data" | ConvertTo-Html -CSSUri demo.css -Title "Formattting From PowerShell" -PreContent "$($ReportHeader)" -PostContent "$($ReportFooter)" | Out-File -Encoding utf8 "demo.html"