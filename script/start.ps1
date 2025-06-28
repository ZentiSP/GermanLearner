# Stop the MongoDB Windows service
Write-Host "Stopping MongoDB service..."
net stop MongoDB
Start-Sleep -Seconds 5

Write-Host "Starting mongod..."
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'mongod --dbpath "D:\MongoData" --replSet rs0'

# Wait for mongod to be ready by polling port 27017
Write-Host "Waiting for mongod to be ready..."

$maxTries = 30
$tries = 0
$connected = $false

while (-not $connected -and $tries -lt $maxTries) {
    try {
        $socket = New-Object System.Net.Sockets.TcpClient
        $socket.Connect("localhost", 27017)
        $socket.Close()
        $connected = $true
    } catch {
        Start-Sleep -Seconds 1
        $tries++
    }
}

if ($connected) {
    Write-Host "mongod is ready. Launching mongosh..."
    Start-Process powershell -ArgumentList '-NoExit', '-Command', 'mongosh'
} else {
    Write-Host "❌ mongod did not become ready in time (waited $maxTries seconds)"
}

npx prisma generate
Clear-Host
npm run dev

# Close the admin PowerShell window after script finishes
Stop-Process -Id $PID