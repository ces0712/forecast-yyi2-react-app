<?php

use yii\db\Migration;

/**
 * Handles the creation of table `api`.
 */
class m170429_180153_create_api_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('api', [
            'id' => $this->primaryKey(),
            'api_key' => $this->string(150)->notNull(),
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('api');
    }
}
