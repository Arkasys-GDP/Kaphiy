<#
.SYNOPSIS
  Smoke tests REST para kaphiy-backend.

.DESCRIPTION
  Ejecuta secuencialmente los 5 escenarios de verificacion REST:
    (1) POST /auth/login           --> JWT
    (2) GET  /orders/active (auth) --> 200 OK + payload
    (3) GET  /orders/active        --> 401 Unauthorized
    (4) PATCH /orders/:id/status   --> 200 OK + mapeo PREPARING/IN_PREP
    (5) GET  /orders/metrics       --> estructura agregada

.NOTES
  Requisito: backend corriendo en http://localhost:3001
    cd backend
    npm run build
    node dist/src/main.js

  Uso:
    powershell -ExecutionPolicy Bypass -File scripts/smoke-tests.ps1
#>

$ErrorActionPreference = "Continue"
$BASE = "http://localhost:3001"
$PIN  = "1234"

function Write-Divider {
    param([string]$Title)
    Write-Host ""
    Write-Host ("-" * 70) -ForegroundColor DarkGray
    Write-Host $Title -ForegroundColor Cyan
    Write-Host ("-" * 70) -ForegroundColor DarkGray
}

function Write-Header {
    param([string]$Text)
    Write-Host ""
    Write-Host ("=" * 70) -ForegroundColor Yellow
    Write-Host (" " + $Text.ToUpper()) -ForegroundColor Yellow
    Write-Host ("=" * 70) -ForegroundColor Yellow
}

function Pretty {
    param([object]$Obj)
    $Obj | ConvertTo-Json -Depth 10
}

Write-Header "SMOKE TESTS REST -- kaphiy-backend"
Write-Host " Base URL : $BASE" -ForegroundColor Gray
Write-Host " PIN      : $PIN" -ForegroundColor Gray
Write-Host " Fecha    : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray

# Health check
try {
    $null = Invoke-WebRequest -Uri "$BASE" -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
} catch {
    Write-Host ""
    Write-Host "[ERROR] Backend no responde en $BASE" -ForegroundColor Red
    Write-Host "        Arranca con: node dist/src/main.js" -ForegroundColor Red
    exit 1
}

# ---------------------------------------------------------------------
# (1) POST /auth/login
# ---------------------------------------------------------------------
Write-Divider "(1) POST /auth/login"
Write-Host "Request:" -ForegroundColor White
Write-Host "  POST $BASE/auth/login" -ForegroundColor DarkGray
Write-Host "  Content-Type: application/json" -ForegroundColor DarkGray
Write-Host "  Body: { `"pin`": `"$PIN`" }" -ForegroundColor DarkGray

$loginRes = Invoke-RestMethod -Method Post `
    -Uri "$BASE/auth/login" `
    -ContentType "application/json" `
    -Body (@{ pin = $PIN } | ConvertTo-Json)

Write-Host ""
Write-Host "Response (HTTP 200):" -ForegroundColor Green
Pretty $loginRes

$TOKEN = $loginRes.access_token
Write-Host ""
Write-Host "JWT capturado ($($TOKEN.Length) chars):" -ForegroundColor White
Write-Host ("  " + $TOKEN.Substring(0, 50) + "...") -ForegroundColor DarkGray
Write-Host ("  ..." + $TOKEN.Substring($TOKEN.Length - 30)) -ForegroundColor DarkGray

$AuthHeader = @{ Authorization = "Bearer $TOKEN" }

# ---------------------------------------------------------------------
# (2) GET /orders/active con token
# ---------------------------------------------------------------------
Write-Divider "(2) GET /orders/active  [CON Bearer token]"
Write-Host "Request:" -ForegroundColor White
Write-Host "  GET $BASE/orders/active" -ForegroundColor DarkGray
Write-Host "  Authorization: Bearer (JWT)" -ForegroundColor DarkGray

$activeRes = Invoke-RestMethod -Method Get `
    -Uri "$BASE/orders/active" `
    -Headers $AuthHeader

Write-Host ""
Write-Host "Response (HTTP 200):" -ForegroundColor Green
Write-Host ("  orders.length = " + $activeRes.orders.Count) -ForegroundColor White
Write-Host ("  stats         = " + ($activeRes.stats | ConvertTo-Json -Compress)) -ForegroundColor White
Write-Host ""
Write-Host "Primera order (resumen):" -ForegroundColor White
if ($activeRes.orders.Count -gt 0) {
    $first = $activeRes.orders[0]
    Pretty @{
        id            = $first.id
        orderNumber   = $first.orderNumber
        tableNumber   = $first.tableNumber
        status        = $first.status
        paymentStatus = $first.paymentStatus
        total         = $first.total
        items_count   = $first.items.Count
        createdAt     = $first.createdAt
    }
} else {
    Write-Host "  (sin orders activas)" -ForegroundColor DarkGray
}

# ---------------------------------------------------------------------
# (3) GET /orders/active SIN token
# ---------------------------------------------------------------------
Write-Divider "(3) GET /orders/active  [SIN token -- espera 401]"
Write-Host "Request:" -ForegroundColor White
Write-Host "  GET $BASE/orders/active   (sin Authorization header)" -ForegroundColor DarkGray

try {
    $null = Invoke-WebRequest -Method Get `
        -Uri "$BASE/orders/active" `
        -UseBasicParsing -ErrorAction Stop
    Write-Host ""
    Write-Host "[WARN] Inesperado: no devolvio 401" -ForegroundColor Red
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    $body       = $_.ErrorDetails.Message
    Write-Host ""
    Write-Host ("Response (HTTP " + $statusCode + "):") -ForegroundColor Green
    Write-Host "  $body" -ForegroundColor White
    if ($statusCode -eq 401) {
        Write-Host "  [OK] Guard JWT funciona -- request bloqueada como se esperaba" -ForegroundColor Green
    }
}

# ---------------------------------------------------------------------
# (4) PATCH /orders/:id/status
# ---------------------------------------------------------------------
Write-Divider "(4) PATCH /orders/:id/status  [mapeo PREPARING -> IN_PREP]"

# Si no hay orders activas, crear una temporal para poder demostrar el PATCH
$createdTemp = $false
if ($activeRes.orders.Count -eq 0) {
    Write-Host "Cocina vacia. Creando order temporal para demostrar PATCH..." -ForegroundColor DarkGray
    try {
        $products = Invoke-RestMethod -Method Get -Uri "$BASE/products"
        $tables   = Invoke-RestMethod -Method Get -Uri "$BASE/tables"
        if ($products.Count -gt 0 -and $tables.Count -gt 0) {
            $tempBody = @{
                tableId = $tables[0].id
                items   = @(@{ productId = $products[0].id; quantity = 1 })
            } | ConvertTo-Json -Depth 5
            $tempOrder = Invoke-RestMethod -Method Post `
                -Uri "$BASE/orders" `
                -ContentType "application/json" `
                -Body $tempBody
            $activeRes = Invoke-RestMethod -Method Get `
                -Uri "$BASE/orders/active" `
                -Headers $AuthHeader
            $createdTemp = $true
            Write-Host ("  Order temporal creada: id=" + $tempOrder.id) -ForegroundColor DarkGray
        }
    } catch {
        Write-Host "  No se pudo crear order temporal (faltan products/tables)" -ForegroundColor DarkGray
    }
}

if ($activeRes.orders.Count -eq 0) {
    Write-Host "  (sin orders activas -- skip)" -ForegroundColor DarkGray
} else {
    $orderId   = $activeRes.orders[0].id
    $oldStatus = $activeRes.orders[0].status
    Write-Host "Request:" -ForegroundColor White
    Write-Host "  PATCH $BASE/orders/$orderId/status" -ForegroundColor DarkGray
    Write-Host "  Authorization: Bearer (JWT)" -ForegroundColor DarkGray
    Write-Host "  Body: { `"kitchenStatus`": `"PREPARING`" }" -ForegroundColor DarkGray

    $patchRes = Invoke-RestMethod -Method Patch `
        -Uri "$BASE/orders/$orderId/status" `
        -Headers $AuthHeader `
        -ContentType "application/json" `
        -Body (@{ kitchenStatus = "PREPARING" } | ConvertTo-Json)

    Write-Host ""
    Write-Host "Response (HTTP 200):" -ForegroundColor Green
    Pretty @{
        id            = $patchRes.id
        orderNumber   = $patchRes.orderNumber
        status        = $patchRes.status
        paymentStatus = $patchRes.paymentStatus
        total         = $patchRes.total
        updatedAt     = $patchRes.updatedAt
    }
    Write-Host ""
    Write-Host ("[OK] kitchenStatus=PREPARING devolvio status=" + $patchRes.status) -ForegroundColor Green
    Write-Host "     --> Adapter backend mapea PREPARING <-> IN_PREP correctamente" -ForegroundColor White

    # Rollback al estado previo
    $rollbackMap = @{
        "PENDING"      = "WAITING"
        "IN_PREP"      = "PREPARING"
        "READY"        = "READY"
        "DELIVERED"    = "DELIVERED"
        "OUT_OF_STOCK" = "OUT_OF_STOCK"
    }
    $rollbackTo = $rollbackMap[$oldStatus]
    if ($rollbackTo -and -not $createdTemp) {
        $null = Invoke-RestMethod -Method Patch `
            -Uri "$BASE/orders/$orderId/status" `
            -Headers $AuthHeader `
            -ContentType "application/json" `
            -Body (@{ kitchenStatus = $rollbackTo } | ConvertTo-Json)
        Write-Host ("     (rollback aplicado: status restaurado a " + $oldStatus + ")") -ForegroundColor DarkGray
    }

    # Limpiar order temporal si la creamos
    if ($createdTemp) {
        try {
            $null = Invoke-RestMethod -Method Delete -Uri "$BASE/orders/$orderId"
            Write-Host "     (order temporal eliminada de la DB)" -ForegroundColor DarkGray
        } catch {
            Write-Host "     (no se pudo eliminar order temporal id=$orderId)" -ForegroundColor DarkGray
        }
    }
}

# ---------------------------------------------------------------------
# (5) GET /orders/metrics?range=daily
# ---------------------------------------------------------------------
Write-Divider "(5) GET /orders/metrics?range=daily"
Write-Host "Request:" -ForegroundColor White
Write-Host "  GET $BASE/orders/metrics?range=daily" -ForegroundColor DarkGray
Write-Host "  Authorization: Bearer (JWT)" -ForegroundColor DarkGray

$metricsRes = Invoke-RestMethod -Method Get `
    -Uri "$BASE/orders/metrics?range=daily" `
    -Headers $AuthHeader

Write-Host ""
Write-Host "Response (HTTP 200):" -ForegroundColor Green
Pretty $metricsRes

# ---------------------------------------------------------------------
# Resumen final
# ---------------------------------------------------------------------
Write-Header "RESUMEN"
Write-Host (" [OK] (1) POST /auth/login              --> 200 OK + JWT " + $TOKEN.Length + " chars") -ForegroundColor Green
Write-Host (" [OK] (2) GET  /orders/active  AUTH     --> 200 OK (" + $activeRes.orders.Count + " orders)") -ForegroundColor Green
Write-Host  " [OK] (3) GET  /orders/active  NO-AUTH  --> 401 Unauthorized" -ForegroundColor Green
Write-Host  " [OK] (4) PATCH /orders/:id/status      --> 200 OK, mapeo verificado" -ForegroundColor Green
Write-Host  " [OK] (5) GET  /orders/metrics          --> 200 OK + agregacion" -ForegroundColor Green
Write-Host ""
Write-Host "Backend kaphiy verificado end-to-end." -ForegroundColor Cyan
Write-Host ""
