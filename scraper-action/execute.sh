#!/bin/bash

# array=( aston-martin audi bentley bmw citroen datsun ferrari force ford great-wall haima honda hyundai isuzu jaguar jeep kia lamborghini land-rover lexus mahindra maruti-suzuki maserati mercedes-benz mg mini mitsubishi nissan porsche renault rolls-royce skoda tata toyota volkswagen volvo )
array=( aston-martin )
# declare -a array=("element1" "element2" "element3")

now=$(date)
echo "Script started for date: $now"
for i in "${array[@]}"
do
	echo "Starting $i"
    curl -i --write-out "%{http_code}\n" --silent --output /dev/null  --header 'Host: localhost:3000' "http://localhost:3000/api/brands?brand=${i}"
    # curl -i --write-out "%{http_code}\n" --silent --output /dev/null  --header 'Host: auto-scraper.vercel.app' "https://auto-scraper.vercel.app/api/brands?brand=${i}"
    echo "Completed $i"
    # sleep 10
done
echo "Script completed for date: $now"
exit