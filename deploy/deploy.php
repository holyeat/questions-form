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

$basepath = 'build/static/js/';
$objects = array_merge(glob($basepath . '*.*.chunk.js'), glob($basepath . 'runtime-main.*.js'));
$buildId = uniqid();


$filenames = [];
foreach ($objects as $objectPath) {
  $contents = file_get_contents($objectPath);
  $filename = explode('/', $objectPath);
  $filename = $filename[sizeof($filename) - 1];
  $filenames[] = $filename;


  $result = $client->putObject(array(
    'Bucket' => 'holyeat-front',
    'Key'    => $buildId . '/'. $filename,
    'Body'   => $contents,
  ));  
}

echo "\n Your build id: ". $buildId . "\n\n";
echo json_encode($filenames);
echo "\n";