$ErrorActionPreference = "Stop"

$connectorDir = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $connectorDir ".env.local"
$serverFile = Join-Path $connectorDir "src\server.mjs"

if (-not (Test-Path -LiteralPath $envFile)) {
    [Console]::Error.WriteLine("Missing sms-connector\.env.local. Copy .env.example and fill it in.")
    exit 1
}

foreach ($line in Get-Content -LiteralPath $envFile -Encoding UTF8) {
    $trimmed = $line.Trim()
    if (-not $trimmed -or $trimmed.StartsWith("#")) {
        continue
    }

    $separator = $trimmed.IndexOf("=")
    if ($separator -le 0) {
        [Console]::Error.WriteLine("Ignoring invalid environment line: $trimmed")
        continue
    }

    $name = $trimmed.Substring(0, $separator).Trim()
    $value = $trimmed.Substring($separator + 1).Trim()
    if ($name -notmatch "^[A-Z][A-Z0-9_]*$") {
        [Console]::Error.WriteLine("Ignoring invalid environment variable name: $name")
        continue
    }

    $doubleQuoted = $value.StartsWith('"') -and $value.EndsWith('"')
    $singleQuoted = $value.StartsWith("'") -and $value.EndsWith("'")
    if ($value.Length -ge 2 -and ($doubleQuoted -or $singleQuoted)) {
        $value = $value.Substring(1, $value.Length - 2)
    }

    Set-Item -Path "Env:$name" -Value $value
}

& node $serverFile
exit $LASTEXITCODE
