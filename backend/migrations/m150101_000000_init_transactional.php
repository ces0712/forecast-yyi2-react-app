<?php

use yii\db\Schema;

class m150101_000000_init_transactional extends \yii\db\Migration
{
    public function safeUp()
    {
        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            // http://stackoverflow.com/questions/766809/whats-the-difference-between-utf8-general-ci-and-utf8-unicode-ci
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        $this->createTable('user', [
            'id' => Schema::TYPE_PK,
            'username' => Schema::TYPE_STRING . ' NOT NULL',
            'is_email_verified' => Schema::TYPE_BOOLEAN . ' NOT NULL DEFAULT false',
            'auth_key' => Schema::TYPE_STRING . '(32) NOT NULL',
            'password_hash' => Schema::TYPE_STRING . ' NOT NULL',
            'password_reset_token' => Schema::TYPE_STRING,
            'email_confirmation_token' => Schema::TYPE_STRING,
            'email' => Schema::TYPE_STRING . ' NOT NULL',
            'role' => Schema::TYPE_SMALLINT . ' NOT NULL DEFAULT 10',

            'status' => Schema::TYPE_SMALLINT . ' NOT NULL DEFAULT 10',
            'created_at' => Schema::TYPE_DATETIME . ' NOT NULL',
            'updated_at' => Schema::TYPE_DATETIME . ' NOT NULL',
            'access_token' => Schema::TYPE_STRING . '(50)',
       ], $tableOptions);

        $this->insert('user', [
            'username'=> 'test',
            'is_email_verified'=> false,
            'auth_key'=> 'sm9j4cObBS-TYIb7_5pYWCTuQERV4n8B',
            'password_hash'=> '$2y$13$JJKaP0KlZTL16LHa/8.pF.B/i/j999yx1dMB0cOir4qOLNZUT9ju.',
            'password_reset_token'=> null,
            'email_confirmation_token'=> '3KUMBklWUs7gUhOH4uFX1rIkZGlubZ6G_1493506310',
            'email'=> 'sometest@gmail.com',
            'role'=> 10,
            'status'=> 10,
            'created_at'=> '2017-04-29 22:51:50',
            'updated_at'=> '2017-04-29 22:51:50',
        ]);
    }
    

    public function safeDown()
    {
        $this->delete('user', ['id' => 1]);
        $this->dropTable('user');
    }
}
