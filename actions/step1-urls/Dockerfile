FROM debian:9.5-slim

RUN apt-get update && apt-get install curl -y
ADD execute.sh /execute.sh
RUN chmod +x /execute.sh

ENTRYPOINT ["/execute.sh"]