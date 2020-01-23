param([string]$action = "apply", [string]$jsonFile = "credential.json")

function ReplaceStringInFile ([string]$filePath, [string]$find, [string]$replace) {
  $tempFilePath = "$filePath.tmp"
  (Get-Content -Path $filePath) -replace $find, $replace | Add-Content -Path $tempFilePath
  Remove-Item -Path $filePath
  Move-Item -Path $tempFilePath -Destination $filePath
}

$currentLocation = Get-Location
$workDir = Join-Path $currentLocation -ChildPath "../"
$altSegment = "deny"
$exitCode = 1

if (!(($action -eq "apply") -or ($action -eq "deny"))) {
  Write-Host "Disallowed value: '$action' . Allow only: 'apply' or 'deny'"
  exit $exitCode
}
if (!(Test-Path $jsonFile)) {
  Write-Host "Param file: '$jsonFile' not exists."
  exit $exitCode
}

if ($action -eq "apply") {
  $altSegment = "deny"
} else {
  $altSegment = "apply"
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
