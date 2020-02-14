# Start from the latest golang base image
FROM golang:latest

# Add Maintainer Info
LABEL maintainer="Yashi Gupta <vashishtiv@gmail.com>"

# Set the Current Working Directory inside the container
WORKDIR C:/Users/Yashi/Desktop/go-docker

# Build Args
ARG LOG_DIR=C:/Users/Yashi/Desktop/go-docker/logs

# Create Log Directory
RUN mkdir -p ${LOG_DIR}

# Environment Variables
ENV LOG_FILE_LOCATION=${LOG_DIR}/go-docker.log

# Copy go mod and sum files
COPY go.mod ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Build the Go app
RUN go build -o main .

# Expose port 8080 to the outside world
EXPOSE 8080

# Declare volumes to mount
VOLUME [${LOG_DIR}]

# Command to run the executable
CMD ["./main"]
