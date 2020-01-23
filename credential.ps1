param([string]$action = "deny", [string]$jsonFile = "credential.json")

function ReplaceStringInFile ([string]$filePath, [string]$find, [string]$replace) {
  $tempFilePath = "$filePath.tmp"
  (Get-Content -Path $filePath) -replace $find, $replace | Add-Content -Path $tempFilePath
  Remove-Item -Path $filePath
  Move-Item -Path $tempFilePath -Destination $filePath
}

$currentLocation = Get-Location
$workDir = $currentLocation
$altSegment = "deny"
$exitCode = 1

if (!(($action -eq "allow") -or ($action -eq "deny"))) {
  Write-Host "Disallowed value: '$action' . Allow only: 'allow' or 'deny'"
  exit $exitCode
}
if (!(Test-Path $jsonFile)) {
  Write-Host "Param file: '$jsonFile' not exists."
  exit $exitCode
}

if ($action -eq "allow") {
  $altSegment = "deny"
} else {
  $altSegment = "allow"
}

try {
  # read json
  $apijson = Get-Content -Path $jsonFile -Raw | ConvertFrom-Json
  $apijson | ForEach-Object -Process {
    $filePath = Join-Path $workDir -ChildPath $_.file
    if (Test-Path $filePath) {
        ReplaceStringInFile $filePath $_.$altSegment $_.$action
    }
  }
}
catch {
  Set-Location -Path $currentLocation
  Write-Host $error[0].Exception
}
finally {
  Set-Location -Path $currentLocation
  exit $exitCode
}
