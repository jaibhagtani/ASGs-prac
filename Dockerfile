FROM codercom/code-server:4.96.4

USER root
ARG NODE_VERSION=v20.15.0
RUN apt update -y && \
    apt install -y curl && \
    curl -fsSL https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-linux-x64.tar.gz -o node.tar.gz && \
    tar -xzvf node.tar.gz && \
    rm node.tar.gz && \
    echo "export PATH=\$PATH:/node-$NODE_VERSION-linux-x64/bin" >> /root/.bashrc

USER coder

EXPOSE 8080

RUN mkdir -p /tmp/bolty-worker

CMD ["code-server", "--auth", "none", "--bind-addr", "0.0.0.0:8080", "/tmp/bolty-worker"]