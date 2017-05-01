<?php

namespace app\modules\v1\controllers;

use yii\rest\ActiveController;
use yii\filters\auth\HttpBasicAuth;
use app\modules\v1\models\User;

class ApiController extends ActiveController 
{
    public $modelClass = 'app\modules\v1\models\Api';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['rateLimiter']['enableRateLimitHeaders'] = false;
        $behaviors['authenticator'] = [
            'class' => HttpBasicAuth::className(),
            'auth' => [$this, 'auth']
        ];
        return $behaviors;
    }

    public function auth($username, $password)
    {
        return User::auth($username, $password);

    }
}

?>