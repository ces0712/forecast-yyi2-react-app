<?php
$config = [
    'id' => 'basic',
    'basePath' => '/var/www/html',
    'bootstrap' => ['log'],
    'vendorPath' => '/var/www/vendor',
    'modules' => [
        'v1' => [
            'class' => 'app\modules\v1\Module',
        ],
     ],
    'components' => [
        'cache' => [
            'class' => 'yii\caching\ApcCache',
            'useApcu' => true,
        ],
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => \DockerEnv::dbDsn(),
            'username' => \DockerEnv::dbUser(),
            'password' => \DockerEnv::dbPassword(),
            'charset' => 'utf8',
            'tablePrefix' => '',
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'transport' => [
                'class' => 'Swift_SmtpTransport',
                'host' => \DockerEnv::get('SMTP_HOST'),
                'username' => \DockerEnv::get('SMTP_USER'),
                'password' => \DockerEnv::get('SMTP_PASSWORD'),
            ],
        ],
        'log' => [
            'traceLevel' => \DockerEnv::get('YII_TRACELEVEL', 0),
            'targets' => [
                [
                    'class' => 'codemix\streamlog\Target',
                    'url' => 'php://stdout',
                    'levels' => ['info','trace'],
                    'logVars' => [],
                ],
                [
                    'class' => 'codemix\streamlog\Target',
                    'url' => 'php://stderr',
                    'levels' => ['error', 'warning'],
                    'logVars' => [],
                ],
            ],
        ],
        'request' => [
            'cookieValidationKey' => \DockerEnv::get('COOKIE_VALIDATION_KEY', null, !YII_ENV_TEST),
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'showScriptName' => false,
            'rules' => [
                [
                    'class' => 'yii\rest\UrlRule', 
                    'controller' => 'v1/user'
                ],
                [
                    'class' => 'yii\rest\UrlRule', 
                    'controller' => 'v1/api',
                    // 'tokens' => [
                    //     '{api_key}'             => '<api_key:\d+>',
                    // ],
                    'pluralize' =>false 
                ],
                [
                    'class' => 'yii\rest\UrlRule', 
                    'controller' => 'v1/city'
                ],
            ],
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableSession' => false,
            'enableAutoLogin' => true,
            // 'loginUrl' => null,
        ],
    ],

    'params' => require('/var/www/html/config/params.php'),
];

if (YII_ENV_DEV) {
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        'allowedIPs' => ['*'],
    ];
    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        'allowedIPs' => ['*'],
    ];
}

return $config;
