<?php

use yii\db\Migration;

/**
 * Handles the creation of table `city`.
 * Has foreign keys to the tables:
 *
 * - `api`
 */
class m170429_210323_create_transactional_city_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        $this->createTable('city', [
            'id' => $this->primaryKey(),
            'city_name' => $this->string(50)->notNull(),
            'country_code' => $this->string(5),
            'api_id' => $this->integer()->notNull(),
        ]);

        // creates index for column `api_id`
        $this->createIndex(
            'idx-city-api_id',
            'city',
            'api_id'
        );

        // add foreign key for table `api`
        $this->addForeignKey(
            'fk-city-api_id',
            'city',
            'api_id',
            'api',
            'id',
            'CASCADE'
        );

         $this->insert('city', [
            'city_name' => 'Berlin',
            'country_code' => 'DE',
            'api_id'=>1,
        ]);

        $this->insert('city', [
            'city_name' => 'New York',
            'country_code' => 'US',
            'api_id'=>1,
        ]);

        $this->insert('city', [
            'city_name' => 'London',
            'country_code' => 'UK',
            'api_id'=>1,
        ]);

        $this->insert('city', [
            'city_name' => 'Caracas',
            'country_code' => 'VE',
            'api_id'=>1,
        ]);

        $this->insert('city', [
            'city_name' => 'Paris',
            'country_code' => 'FR',
            'api_id'=>1,
        ]);


    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        $this->delete('city', ['id' => 1]);
        $this->delete('city', ['id' => 2]);
        $this->delete('city', ['id' => 3]);
        $this->delete('city', ['id' => 4]);
        $this->delete('city', ['id' => 5]);
        // drops foreign key for table `api`
        $this->dropForeignKey(
            'fk-city-api_id',
            'city'
        );

        // drops index for column `api_id`
        $this->dropIndex(
            'idx-city-api_id',
            'city'
        );

        $this->dropTable('city');
    }
}
