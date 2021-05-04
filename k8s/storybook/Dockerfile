ARG GATSBY_IMAGE
ARG NGINX_IMAGE
FROM $GATSBY_IMAGE as build

WORKDIR /build

COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build-storybook

FROM $NGINX_IMAGE
COPY --from=build /build/.storybook-static /usr/share/nginx/html
EXPOSE 8000
