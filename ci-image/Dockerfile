FROM gcr.io/cloud-builders/npm

RUN echo "deb http://archive.debian.org/debian jessie-backports main" > /etc/apt/sources.list.d/jessie-backports.list
RUN apt-get -o Acquire::Check-Valid-Until=false update && \
	apt-get install -y -t jessie-backports openjdk-8-jre && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/*
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOME

ENTRYPOINT ["npm"]
