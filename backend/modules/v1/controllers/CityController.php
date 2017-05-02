<?php

namespace app\modules\v1\controllers;

use yii\rest\ActiveController;
use yii\filters\auth\HttpBasicAuth;
use yii\data\ActiveDataProvider;
use yii\web\Response;
// manage sync and async request
use GuzzleHttp\Client;


use app\modules\v1\models\City;
use app\modules\v1\models\User;


class CityController extends ActiveController
{
    public $modelClass = 'app\modules\v1\models\City';

    public function actions()
    {

        return [];
    }
    // allow override default crud
    public function actionOptions($id = null) {
        return "ok";
    }

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
                    'view'   => ['get'],
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

    /**
     * [auth description]
     * @param  string $username 
     * @param  string $password 
     * @return array,null  if authentication is pass return the user object else return invalid credentials
     */
    public function auth($username, $password)
    {
        return User::auth($username, $password);
    }

    /**
     * Endpoint cities/$id get five days of weather of the city  
     * @param  integer $id primary key of the table city
     * @return json object 
     */
    public function actionView($id){

        $city = City::find()
            ->where(['id' => $id])
            ->with('api')
            ->one();

        $api_key = $city->api->api_key;
        $q = $city->city_name.','.$city->country_code;

        $url = 'http://api.openweathermap.org/data/2.5/forecast?appid=';
        $url .=  $api_key.'&q=';
        $url .=  $q;
         
        
        $client = new Client();

        $response = $client->request('GET', $url);

        $array_temperatures = array();
        $array_temperatures['id'] = $id;
        $array_temperatures['status_code'] = $response->getStatusCode();

        
        if ($response->getStatusCode() === 200) {
            // Adding the true returns the result as an array and not an stdClass
            $openWeatherResp = json_decode($response->getBody(),true);
            $array_temperatures['main'] = array();
            $array_temperatures['city'] = array();

            $array_temperatures['city'] = $openWeatherResp['city'];

            // the key of interest is list
            foreach ($openWeatherResp['list'] as $array_list) {
                // the key of interest is main
                 $array_temperatures['main'][] = $array_list['main'];
            }

            $array_temperatures['message'] = 'request process';
            
        } else $array_temperatures['message'] = 'Error: Bad Request !!';
        
        return $array_temperatures;
    }  

}

?>