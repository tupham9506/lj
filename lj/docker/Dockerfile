FROM ubuntu:16.04

MAINTAINER tupham9506 <tupham9506@gmail.com>

RUN DEBIAN_FRONTEND=noninteractive

# Add config file
ADD /root/ /tmp/root/

# Update & upgrade
RUN apt-get update && apt-get -y upgrade

#-------------------------------------------------------------------------------
# Service management by supervisor
#-------------------------------------------------------------------------------
RUN apt-get -y install supervisor
ADD /root/etc/supervisord.conf /etc/supervisord.conf
RUN mkdir -p /etc/supervisord.d/

#-------------------------------------------------------------------------------
# SSH
# Default option `INSTALL_WORKSPACE_SSH=false`
#-------------------------------------------------------------------------------
ADD /root/.ssh/id_rsa /root/.ssh/id_rsa
ADD /root/.ssh/id_rsa.pub /root/.ssh/id_rsa.pub
ARG INSTALL_SSH=false
ENV INSTALL_SSH ${INSTALL_SSH}
RUN if [ ${INSTALL_SSH} = true ]; then \
    apt-get -y install openssh-server && \
    cat /root/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys && \
    chmod 644 /root/.ssh/authorized_keys /root/.ssh/id_rsa.pub && \
    chmod 400 /root/.ssh/id_rsa && \
    # SSH login fix. Otherwise user is kicked off after login
    sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd && \
    # Config start ssh daemon using supervisord
    cp /tmp/root/etc/supervisord.d/sshd.ini /etc/supervisord.d/sshd.ini \
;fi

#-------------------------------------------------------------------------------
# Apache-php
# Default option `INSTALL_APACHE_PHP=false`
#-------------------------------------------------------------------------------
ARG INSTALL_APACHE_PHP=false
ENV INSTALL_APACHE_PHP ${INSTALL_APACHE_PHP}
RUN apt-get install -y software-properties-common language-pack-en-base && \
    LC_ALL=en_US.UTF-8 add-apt-repository ppa:ondrej/php && \
    apt-get update
RUN if [ ${INSTALL_APACHE_PHP} = true ]; then \
    apt-get install -y \
        apache2 \
        php7.2 \
        php7.2-cli \
        php7.2-gd \
        php7.2-json \
        php7.2-mbstring \
        php7.2-xml \
        php7.2-xsl \
        php7.2-zip \
        php7.2-soap \
        php-pear \
        libapache2-mod-php7.2 \
        php7.2-curl \
        php7.2-mysql \
        php7.2-dev \
        && \
    # Apache2 config
    mkdir -p /var/lock/apache2 /var/run/apache2 && \
    cp /tmp/root/etc/apache2/sites-enabled/000-default.conf /etc/apache2/sites-enabled/000-default.conf && \
    cp /tmp/root/etc/apache2/apache2.conf /etc/apache2/apache2.conf && \
    cp /tmp/root/etc/apache2/envvars /etc/apache2/envvars && \
    # Config start apache daemon using supervisord
    cp /tmp/root/etc/supervisord.d/apache2.ini /etc/supervisord.d/apache2.ini && \
    cp /tmp/root/etc/supervisord.d/php.ini /etc/supervisord.d/php.ini && \

    # PHP config
    # Update php.ini
    cp /tmp/root/etc/php/7.2/apache2/php.ini /etc/php/7.2/apache2/php.ini && \
    # Install composer and add its bin to the PATH.
    curl -s http://getcomposer.org/installer | php && \
    echo "export PATH=${PATH}:/var/www/vendor/bin" >> ~/.bashrc && \
    mv composer.phar /usr/local/bin/composer && \

    # Enable mode
    a2enmod rewrite && \
    phpenmod mcrypt && \
    a2enmod headers && \
    # Chown own storage dir to www-data
    mkdir -p /var/www/html/storage/ && \
    chown -R www-data:www-data /var/www/html/storage/ \
;fi

#-------------------------------------------------------------------------------
# xDebug
# Default option `INSTALL_XDEBUG=false`
#-------------------------------------------------------------------------------
ARG INSTALL_XDEBUG=false
ENV INSTALL_XDEBUG ${INSTALL_XDEBUG}
ENV XDEBUGINI_PATH=/etc/php/7.2/mods-available/xdebug.ini
RUN if [ ${INSTALL_XDEBUG} = true ] && [ ${INSTALL_APACHE_PHP} = true ]; then \
    apt-get install -y php-xdebug && \
    echo "xdebug.remote_autostart = 0" >> $XDEBUGINI_PATH && \
    echo "xdebug.remote_enable = 1" >> $XDEBUGINI_PATH && \
    echo "xdebug.remote_connect_back = 0" >> $XDEBUGINI_PATH && \
    echo "xdebug.remote_port=9000" >> $XDEBUGINI_PATH && \
    echo "xdebug.remote_host=172.18.0.1" >> $XDEBUGINI_PATH && \
    echo "xdebug.idekey = PHPSTORM" >> $XDEBUGINI_PATH \
;fi

# Clean up
USER root
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /var/www/html
EXPOSE 80 443 3306

# Start supervisord
CMD ["/usr/bin/supervisord", "--configuration=/etc/supervisord.conf"]