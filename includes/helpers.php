<?php
function e(mixed $value): string
{
    return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function safe_url(mixed $value): string
{
    $url = trim((string)$value);
    return filter_var($url, FILTER_VALIDATE_URL) && in_array(strtolower((string)parse_url($url, PHP_URL_SCHEME)), ['http', 'https'], true)
        ? $url
        : '';
}

function asset_url(string $path): string
{
    $base = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/')), '/');
    return $base . '/' . ltrim($path, '/');
}

function contact_links(array $p): array
{
    $items = [];
    $email = trim((string)($p['email'] ?? ''));
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $items['email'] = 'mailto:' . rawurlencode($email);
    }
    $phone = preg_replace('/\\D+/', '', (string)($p['phone'] ?? ''));
    if (strlen($phone) >= 8) {
        $items['phone'] = 'tel:+' . $phone;
    }
    $whatsapp = preg_replace('/\\D+/', '', (string)($p['whatsapp'] ?? ''));
    if (strlen($whatsapp) >= 10 && strlen($whatsapp) <= 15) {
        $items['whatsapp'] = 'https://wa.me/' . $whatsapp;
    }
    foreach (['github' => 'github_url', 'linkedin' => 'linkedin'] as $label => $key) {
        $url = safe_url($p[$key] ?? '');
        if ($url !== '') {
            $items[$label] = $url;
        }
    }
    return $items;
}
