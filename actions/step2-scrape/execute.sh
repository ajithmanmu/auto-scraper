#!/bin/bash

now=$(date)
echo "Script started for date: $now"
for i in {1..110}
do
	echo "Starting $i"
    # curl -i --write-out "%{http_code}\n" --silent --output /dev/null  --header 'Host: localhost:3000' "http://localhost:3000/api/brands?brand=${i}"
    curl -i --write-out "%{http_code}\n" --silent --output /dev/null  --header 'Host: auto-scraper.vercel.app' "https://auto-scraper.vercel.app/api/scraper?secret=3315442425&limit=10"
    echo "Completed $i"
    sleep 60
done
echo "Script completed for date: $now"
exit