<?php 
$I = new FunctionalTester($scenario);
$I->wantTo('ensure that authentication works');

/** @var \app\modules\v1\models\User $user */
// check basic auth
$user = $I->grabRecord('app\modules\v1\models\User');

// check response endpoint users 
// user is not authorize
 $I->sendGET('/users', ['username' => $user->username]);
 $I->seeResponseContainsJson(['name' => 'Unauthorized']);