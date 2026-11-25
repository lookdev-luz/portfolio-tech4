<?php
function e(mixed $value): string { return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function safe_url(mixed $value): string { $url = trim((string)$value); return preg_match('~^https?://~i', $url) ? $url : ''; }
function contact_links(array $p): array {
    $items=[];
    if (filter_var($p['email'] ?? '', FILTER_VALIDATE_EMAIL)) $items['email']='mailto:'.$p['email'];
    $phone=preg_replace('/\D+/', '', $p['phone'] ?? ''); if ($phone) $items['phone']='tel:+'.$phone;
    $wa=preg_replace('/\D+/', '', $p['whatsapp'] ?? ''); if (strlen($wa)>=10) $items['whatsapp']='https://wa.me/'.$wa;
    foreach (['github'=>'github_url','linkedin'=>'linkedin'] as $label=>$key) { $u=safe_url($p[$key] ?? ''); if ($u) $items[$label]=$u; }
    return $items;
}
