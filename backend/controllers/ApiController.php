<?php

namespace app\controllers;
use yii\rest\ActiveController;
use yii\filters\auth\HttpBasicAuth;
use \app\helpers\CustomAuthHelper;




class ApiController extends ActiveController 
{
    public $modelClass = 'app\models\Api';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => HttpBasicAuth::className(),
            'auth' => [$this, 'auth']
        ];
        return $behaviors;
    }

    public function auth($username, $password)
    {
        return CustomAuthHelper::auth($username, $password);

    }
}

?>