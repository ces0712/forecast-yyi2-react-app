<?php

namespace app\controllers;

use yii\rest\ActiveController;
use \app\helpers\CustomAuthHelper;

class CityController extends ActiveController
{
    public $modelClass = 'app\models\City';

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