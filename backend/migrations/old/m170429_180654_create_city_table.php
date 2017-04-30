<?php

use yii\db\Migration;

/**
 * Handles the creation of table `city`.
 * Has foreign keys to the tables:
 *
 * - `api`
 */
class m170429_180654_create_city_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
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
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
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
