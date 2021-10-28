<?php
use DevCoder\DotEnv;

$absoluteEnvPath = __DIR__. '/.env';
(new DotEnv($absoluteEnvPath))->load();

define('AWS_S3_KEY', getenv('AWS_S3_KEY'));
define('AWS_S3_SECRET', getenv('AWS_S3_SECRET'));
define('AWS_S3_REGION', getenv('AWS_S3_REGION'));
define('AWS_S3_BUCKET', getenv('AWS_S3_BUCKET'));
define('AWS_S3_URL', getenv('AWS_S3_URL'));


   