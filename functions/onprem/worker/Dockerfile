FROM golang:1.19-buster as builder

WORKDIR /app
#RUN go get github.com/docker/docker/api/types github.com/docker/docker/api/types/container github.com/docker/docker/client

#RUN go env -w GO111MODULE=auto 
COPY worker.go /app/worker.go
COPY go.mod /app/go.mod
#COPY go.sum /app/go.sum
#RUN go
#COPY go.sum /app/go.sum
RUN go get

#RUN go mod init worker
#RUN go get
#RUN go get github.com/docker/docker/api/types && \
#	go get github.com/docker/docker/api/types/container && \
#	go get github.com/docker/docker/client && \
#	go get github.com/gorilla/mux && \
#	go get github.com/patrickmn/go-cache && \
#	go get github.com/gsoc2/gsoc2-shared && \
#	go get github.com/satori/go.uuid && \
#	go get github.com/fsouza/go-dockerclient && \
#	go get google.golang.org/grpc/balancer/grpclb@v1.37.1

RUN go build
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o worker .

## ALPINE IMAGE
FROM alpine:3.15.0

ENV GSOC2_BASE_IMAGE_REGISTRY=ghcr.io
ENV GSOC2_BASE_IMAGE_NAME=gsoc2/gsoc2
ENV GSOC2_BASE_IMAGE_TAG_SUFFIX=0.8.70

#for k8s
ENV GSOC2_OPENSEARCH_URL=https://opensearch:9200
ENV GSOC2_OPENSEARCH_SKIPSSL_VERIFY=true

RUN apk add --no-cache bash tzdata
COPY --from=builder /app/ /

CMD ["./worker"]
