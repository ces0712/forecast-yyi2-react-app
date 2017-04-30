<?php
namespace app\helpers;
use \app\models\User;
use Yii;

class CustomAuthHelper
{
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

?>