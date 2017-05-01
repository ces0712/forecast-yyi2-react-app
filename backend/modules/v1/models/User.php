<?php
namespace app\modules\v1\models;

use yii\filters\RateLimitInterface;
use app\models\User as CommonUser;
use Yii;

class User extends CommonUser implements RateLimitInterface
{
    
    public $rateLimit = 1;
    public $allowance;
    public $allowance_updated_at;

    // Custom Logic
     public function fields()
    {
        $fields = parent::fields();

        // remove fields that contain sensitive information
        unset($fields['auth_key'], $fields['password_hash'], $fields['password_reset_token']);

        return $fields;
    }

    // Implementing RateLimitInterface methods
    public function getRateLimit($request, $action)
    {
        return [$this->rateLimit, 1]; // $rateLimit requests per second
    }
    
    public function loadAllowance($request, $action)
    {
        return [$this->allowance, $this->allowance_updated_at];
    }   
    
    public function saveAllowance($request, $action, $allowance, $timestamp)
    {
        $this->allowance = $allowance;
        $this->allowance_updated_at = $timestamp;
        $this->save();
    }

    public static function auth($username, $password)
    {
        $user = User::findOne(['username' => $username]);
        if ($user) {
            $validation = Yii::$app->security->validatePassword($password, $user->password_hash);
            if ($validation) {
                return $user;
            }
        }
        return null;
    }

}
