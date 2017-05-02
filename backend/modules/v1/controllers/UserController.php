<?php

namespace app\modules\v1\controllers;


use yii\rest\ActiveController;
use yii\filters\auth\HttpBasicAuth;
use \app\helpers\CustomAuthHelper;
use app\modules\v1\models\User;
use yii\web\Response;



class UserController extends ActiveController
{
    public $modelClass = 'app\modules\v1\models\User';

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['contentNegotiator']['formats']['application/json'] = Response::FORMAT_JSON;
        $behaviors['contentNegotiator']['formats']['text/html'] = Response::FORMAT_JSON;
        $behaviors['rateLimiter']['enableRateLimitHeaders'] = false;
        $behaviors['authenticator'] = [
            'class' => HttpBasicAuth::className(),
            'auth' => [$this, 'auth']
        ];

         $behaviors['verbs'] = [
                'class' => \yii\filters\VerbFilter::className(),
                'actions' => [
                    'index'  => ['get'],
                    'view'   => [''],
                    'create' => [''],
                    'update' => [''],
                    'delete' => [''],
                ],
            ];

            // remove authentication filter
            $auth = $behaviors['authenticator'];
            unset($behaviors['authenticator']);

            // add CORS filter
            $behaviors['corsFilter'] = [
                'class' => \yii\filters\Cors::className(),
                'cors' => [
                    'Origin' => ['*'],
                    'Access-Control-Request-Method' => ['GET', 'OPTIONS'],
                    'Access-Control-Request-Headers' => ['*'],
                ],
            ];

            // re-add authentication filter
            $behaviors['authenticator'] = $auth;
            // avoid authentication on CORS-pre-flight requests (HTTP OPTIONS method)
            $behaviors['authenticator']['except'] = ['options'];

            return $behaviors;    
    }

    public function auth($username, $password)
    {
        return User::auth($username, $password);

    }


}

?>