# Use NGINX as base image
FROM nginx:alpine

# Copy all the static files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY YashwanthG_Resume\(1\).PDF /usr/share/nginx/html/

# Create nginx configuration template
RUN echo $'\
server { \n\
    listen $PORT; \n\
    location / { \n\
        root /usr/share/nginx/html; \n\
        index index.html index.htm; \n\
        try_files $uri $uri/ /index.html; \n\
    } \n\
} \n\
' > /etc/nginx/templates/default.conf.template

# Set environment variable for template processing
ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx/conf.d
ENV NGINX_ENVSUBST_TEMPLATE_DIR=/etc/nginx/templates

# Start NGINX with template processing
CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
