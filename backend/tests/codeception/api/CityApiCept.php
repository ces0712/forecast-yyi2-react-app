<?php 
$I = new ApiTester($scenario);
$I->wantTo('check api city works');

$I->amGoingTo('authenticate');
$user = $I->grabRecord('app\models\User');
$I->amHttpAuthenticated($user->username, 'test');

$I->amGoingTo('check endpoint /cities');
$city = $I->grabRecord('app\models\City');
$I->sendGET('/cities', [0=>['api_id'=>1]]);
$I->seeResponseCodeIs(200);

$I->amGoingTo('check endpoint /cities/$id');
$I->sendGET("/cities/{$city->id}");
$I->seeResponseCodeIs(200);
$I->seeResponseContainsJson(['message' => 'request process']);

$I->amGoingTo('check update status endpoint /cities/$id');
// pass the header
$I->haveHttpHeader('Content-Type', 'application/json');
$I->sendPUT("/cities/{$city->id}",['status'=>false],array());
$I->seeResponseIsJson();
$I->seeResponseContainsJson(['status' => false]);
$I->seeResponseCodeIs(200);