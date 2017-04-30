<?php

use yii\db\Migration;

/**
 * Handles the creation of table `api`.
 */
class m170429_210153_create_transactional_api_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        $this->createTable('api', [
            'id' => $this->primaryKey(),
            'api_key' => $this->string(150)->notNull(),
        ]);

         $this->insert('api', [
            'api_key' => '06ea88bf73465a7ad64b9312777f26ef',
        ]);
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        $this->delete('api', ['id' => 1]);
        $this->dropTable('api');
    }
}
