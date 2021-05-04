ARG GATSBY_IMAGE
ARG NGINX_IMAGE
FROM $GATSBY_IMAGE as build

WORKDIR /build

COPY . .
RUN yarn install --frozen-lockfile
RUN yarn site:build

FROM $NGINX_IMAGE
RUN rm /etc/nginx/conf.d/default.conf
COPY k8s/site/nginx.conf /etc/nginx/conf.d/pharos.conf
COPY --from=build /build/packages/site/public /usr/share/nginx/html
EXPOSE 8000
