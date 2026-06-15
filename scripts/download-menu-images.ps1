# =========================================================
# Download asset gambar menu Roene Cafe & Resto ke folder images/
# Sumber: Wikipedia REST API (thumbnail dari Wikimedia Commons)
# Endpoint: https://{lang}.wikipedia.org/api/rest_v1/page/summary/{Title}
# =========================================================

$ErrorActionPreference = "Continue"
$ProgressPreference    = "SilentlyContinue"

$root = Split-Path -Parent $PSScriptRoot
$dest = Join-Path $root "images"

if (-not (Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest | Out-Null
}

# file = nama file output, title = judul artikel Wikipedia, lang = id atau en
$menus = @(
    # MAKANAN
    @{ file = "nasi_goreng_jawa.jpg";        title = "Nasi_goreng";              lang = "id" },
    @{ file = "sego_endok.jpg";              title = "Nasi_telur";               lang = "id" },
    @{ file = "sego_endok_usus.jpg";         title = "Usus_ayam";                lang = "id" },
    @{ file = "sego_endok_lele.jpg";         title = "Pecel_lele";               lang = "id" },
    @{ file = "sego_endok_ati_ampela.jpg";   title = "Ati_ampela";               lang = "id" },
    @{ file = "kremes_kampung.jpg";          title = "Ayam_goreng_kremes";       lang = "id" },
    @{ file = "kremes_potong.jpg";           title = "Ayam_goreng";              lang = "id" },
    @{ file = "rempah_potong.jpg";           title = "Ayam_bumbu_rempah";        lang = "id" },
    @{ file = "rempah_kampung.jpg";          title = "Ayam_kampung";             lang = "id" },
    @{ file = "bakmi_goreng_jogja.jpg";      title = "Bakmi_jawa";               lang = "id" },
    @{ file = "bihun_goreng.jpg";            title = "Bihun_goreng";             lang = "id" },
    @{ file = "gurami_asam_manis.jpg";       title = "Ikan_asam_manis";          lang = "id" },
    @{ file = "gurami_telur_asin.jpg";       title = "Telur_asin";               lang = "id" },
    @{ file = "gurami_dabu_dabu.jpg";        title = "Dabu-dabu";                lang = "id" },
    @{ file = "gurami_goreng.jpg";           title = "Gurami";                   lang = "id" },
    @{ file = "nasi_putih.jpg";              title = "Nasi";                     lang = "id" },

    # SNACK
    @{ file = "dimsum.jpg";                  title = "Dim_sum";                  lang = "en" },
    @{ file = "french_fries.jpg";            title = "French_fries";             lang = "en" },
    @{ file = "tahu_cabe_garam.jpg";         title = "Tahu_goreng";              lang = "id" },
    @{ file = "tahu_walik.jpg";              title = "Tahu_walik";               lang = "id" },
    @{ file = "snack_platter.jpg";           title = "Gorengan";                 lang = "id" },
    @{ file = "donut.jpg";                   title = "Doughnut";                 lang = "en" },
    @{ file = "pisang_coklat_keju.jpg";      title = "Pisang_goreng";            lang = "id" },
    @{ file = "tempe_mendoan.jpg";           title = "Tempe_mendoan";            lang = "id" },
    @{ file = "tahu_petis.jpg";              title = "Tahu_petis";               lang = "id" },

    # MINUMAN
    @{ file = "coffee_latte.jpg";            title = "Latte";                    lang = "en" },
    @{ file = "popcorn_coffee.jpg";          title = "Caf%C3%A9_latte";          lang = "en" },
    @{ file = "tiramisu_coffee.jpg";         title = "Tiramisu";                 lang = "en" },
    @{ file = "hazelnut_coffee.jpg";         title = "Coffee";                   lang = "en" },
    @{ file = "butterscotch_latte.jpg";      title = "Butterscotch";             lang = "en" },
    @{ file = "caramel_latte.jpg";           title = "Caramel";                  lang = "en" },
    @{ file = "lemonade_coffee.jpg";         title = "Lemonade";                 lang = "en" },
    @{ file = "americano.jpg";               title = "Caff%C3%A8_Americano";     lang = "en" },
    @{ file = "kopi_tubruk.jpg";             title = "Kopi_tubruk";              lang = "id" },
    @{ file = "kopi_tubruk_jahe.jpg";        title = "Wedang_jahe";              lang = "id" },
    @{ file = "vietnam_drip.jpg";            title = "Vietnamese_iced_coffee";   lang = "en" },
    @{ file = "mango_milk.jpg";              title = "Mango";                    lang = "en" },
    @{ file = "melon_milk.jpg";              title = "Melon";                    lang = "en" },
    @{ file = "strawberry_milk.jpg";         title = "Strawberry_milk";          lang = "en" },
    @{ file = "caramel_milk.jpg";            title = "Caramel";                  lang = "en" },
    @{ file = "taro.jpg";                    title = "Bubble_tea";               lang = "en" },
    @{ file = "red_velvet.jpg";              title = "Red_velvet_cake";          lang = "en" },
    @{ file = "chocolate.jpg";               title = "Hot_chocolate";            lang = "en" },
    @{ file = "mineral_water.jpg";           title = "Bottled_water";            lang = "en" },
    @{ file = "tea.jpg";                     title = "Tea";                      lang = "en" },
    @{ file = "lemon_tea.jpg";               title = "Lemon_tea";                lang = "en" },
    @{ file = "vanila_tea.jpg";              title = "Vanilla";                  lang = "en" },
    @{ file = "orange.jpg";                  title = "Orange_juice";             lang = "en" },
    @{ file = "milo_roene.jpg";              title = "Milo_(drink)";             lang = "en" },
    @{ file = "lychee_tea.jpg";              title = "Lychee";                   lang = "en" },
    @{ file = "strawberry_squash.jpg";       title = "Strawberry";               lang = "en" },
    @{ file = "melon_squash.jpg";            title = "Melon";                    lang = "en" },
    @{ file = "manggo_squash.jpg";           title = "Mango";                    lang = "en" },
    @{ file = "wedang_jahe.jpg";             title = "Wedang_jahe";              lang = "id" },
    @{ file = "jahe_sereh.jpg";              title = "Sereh";                    lang = "id" },
    @{ file = "susu_jahe.jpg";               title = "Wedang_jahe";              lang = "id" },
    @{ file = "bir_pletok.jpg";              title = "Bir_pletok";               lang = "id" }
)

$total = $menus.Count
$ok    = 0
$fail  = 0

for ($i = 0; $i -lt $total; $i++) {
    $m       = $menus[$i]
    $outPath = Join-Path $dest $m.file

    if (Test-Path $outPath) {
        if ((Get-Item $outPath).Length -gt 5000) {
            Write-Host "[$($i+1)/$total] SKIP  $($m.file)" -ForegroundColor DarkGray
            $ok++
            continue
        }
    }

    $apiUrl = "https://$($m.lang).wikipedia.org/api/rest_v1/page/summary/$($m.title)"

    try {
        Write-Host "[$($i+1)/$total] WIKI  $($m.file) <- $($m.lang):$($m.title)" -ForegroundColor Cyan
        $json = Invoke-RestMethod -Uri $apiUrl -TimeoutSec 30 -UserAgent "RoeneCafeBot/1.0"

        $imgUrl = $null
        if ($json.originalimage -and $json.originalimage.source) {
            $imgUrl = $json.originalimage.source
        }
        elseif ($json.thumbnail -and $json.thumbnail.source) {
            $imgUrl = $json.thumbnail.source
        }

        if (-not $imgUrl) {
            throw "tidak ada gambar di artikel"
        }

        Invoke-WebRequest -Uri $imgUrl -OutFile $outPath -TimeoutSec 60 -UserAgent "RoeneCafeBot/1.0"

        if ((Get-Item $outPath).Length -lt 3000) {
            throw "file terlalu kecil"
        }

        Write-Host "       OK    $($m.file)" -ForegroundColor Green
        $ok++
    }
    catch {
        Write-Host "       FAIL  $($m.file) -> $($_.Exception.Message)" -ForegroundColor Red
        if (Test-Path $outPath) { Remove-Item $outPath -Force }
        $fail++
    }

    Start-Sleep -Milliseconds 250
}

Write-Host ""
Write-Host "Selesai. OK: $ok, FAIL: $fail, TOTAL: $total" -ForegroundColor Yellow
