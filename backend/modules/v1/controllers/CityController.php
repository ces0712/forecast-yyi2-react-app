<?php

namespace app\modules\v1\controllers;

use yii\rest\Controller;
use yii\filters\auth\HttpBasicAuth;
use yii\data\ActiveDataProvider;

use app\modules\v1\models\City;
use app\modules\v1\models\User;

class CityController extends Controller
{
    public $modelClass = 'app\modules\v1\models\City';

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

     public function actionIndex($id){
        $query = City::find()->where([
                'id'    =>  $id,
            ]);

        return new ActiveDataProvider([
            'query' => $query 
        ]);
    }

    

}

?>