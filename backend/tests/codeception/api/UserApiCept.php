<?php 
$I = new ApiTester($scenario);
$I->wantTo('check api users works');

$I->amGoingTo('authenticate');
$user = $I->grabRecord('app\models\User');
$I->amHttpAuthenticated($user->username, 'test');

$I->amGoingTo('check endpoint /users');
$I->sendGET('/users', ['username' => $user->username]);
$I->seeResponseContainsJson(['status' => 10]);