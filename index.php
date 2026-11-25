<?php
require __DIR__.'/includes/helpers.php';
$p=require __DIR__.'/config/portfolio.php';
$contacts=contact_links($p);
require __DIR__.'/includes/head.php';
require __DIR__.'/includes/header.php';
foreach (['hero','manifesto','expertise','services','projects','architecture-builder','process','contact'] as $section) require __DIR__.'/sections/'.$section.'.php';
require __DIR__.'/includes/footer.php';
