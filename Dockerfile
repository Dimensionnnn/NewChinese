FROM node:16.17.0

ARG LANG=C.UTF-8
ARG LC_ALL=C.UTF-8
ARG WORK_DIR=/newchinese

RUN mkdir ${WORK_DIR} \
    && apt-get update \
    && apt-get install -y screen \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* 

COPY ms-react-is ${WORK_DIR}/ms-react-is/
COPY token-generate-server ${WORK_DIR}/token-generate-server/
WORKDIR /root
ADD scripts /root/scripts/
RUN chmod 777 /root/scripts/*.sh

ENV WORK_DIR=${WORK_DIR}

ENTRYPOINT ["/root/scripts/entrypoint.sh"]
#     && npm install \
#     cd ${WORK_DIR}/token-generate-server \
#     && npm install



