<?php

namespace app\modules\v1\models;

use app\models\City as CommonCity;

/**
 * This is the model class for table "city".
 *
 * @property integer $id
 * @property string $city_name
 * @property string $country_code
 * @property integer $api_id
 *
 * @property Api $api
 */
class City extends CommonCity
{
    
}
