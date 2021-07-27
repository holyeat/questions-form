<?php
require_once('config.php');
require_once('vendor/autoload.php');

use Aws\S3\S3Client;


$credentials = new \Aws\Credentials\Credentials(AWS_S3_KEY, AWS_S3_SECRET);

$client = S3Client::factory(array(
  'credentials' => $credentials,
  'region' => 'us-east-2',
  'version' => '2006-03-01',
));

$result = $client->putObject(array(
  'Bucket' => 'holyeat-front',
  'Key'    => 'data.txt',
  'Body'   => 'Hello!'
));
