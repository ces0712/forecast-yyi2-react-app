FROM codemix/yii2-base:2.0.11.2-php7-apache
#FROM codemix/yii2-base:2.0.11.2-php7-fpm
#FROM codemix/yii2-base:2.0.11.2-hhvm

# Install PHP extensions deps 

RUN apt-get update \
&& apt-get install --no-install-recommends -y \
libfreetype6-dev \
libjpeg62-turbo-dev \
libpng12-dev \
unixodbc-dev \
libxml2-dev \
libaio-dev \
libmemcached-dev \
libpq-dev \
apt-utils \
freetds-dev


# Install PHP extensions 
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \ 
&& docker-php-ext-configure pdo_dblib --with-libdir=/lib/x86_64-linux-gnu \
&& docker-php-ext-install \
iconv \
gd \
pgsql \
mysqli \
pdo_pgsql \
pdo_dblib \
soap \
sockets \
pcntl \
ftp

# Install mongo
RUN pecl install mongodb &&\
    echo "extension=mongodb.so" > /usr/local/etc/php/conf.d/ext-mongodb.ini

# Enable redis extension
ENV PHPREDIS_VERSION php7

RUN curl -L -o /tmp/redis.tar.gz https://github.com/phpredis/phpredis/archive/$PHPREDIS_VERSION.tar.gz  \
    && mkdir /tmp/redis \
    && tar -xf /tmp/redis.tar.gz -C /tmp/redis \
    && rm /tmp/redis.tar.gz \
    && ( \
    cd /tmp/redis/phpredis-$PHPREDIS_VERSION \
    && phpize \
        && ./configure \
    && make -j$(nproc) \
        && make install \
    ) \
    && rm -r /tmp/redis \
    && docker-php-ext-enable redis
 

# Composer packages are installed first. This will only add packages
# that are not already in the yii2-base image.
COPY composer.json /var/www/html/
COPY composer.lock /var/www/html/
RUN composer self-update --no-progress && \
    composer install --no-progress

# Copy the working dir to the image's web root
COPY . /var/www/html

# The following directories are .dockerignored to not pollute the docker images
# with local logs and published assets from development. So we need to create
# empty dirs and set right permissions inside the container.
RUN mkdir runtime web/assets \
    && chown www-data:www-data runtime web/assets

# Expose everything under /var/www (vendor + html)
# This is only required for the nginx setup
VOLUME ["/var/www"]

