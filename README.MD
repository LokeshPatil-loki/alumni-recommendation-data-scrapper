# Steps To run Scrapping Script

## Install Node JS
```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

## [Only for VPS or Cloud Virtual Machines]
```
sudo apt-get install libnss3-dev
```

```
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libgbm-dev
```

## Clone Repository
```
https://github.com/LokeshPatil-loki/alumni-recommendation-data-scrapper.git
```

## Install Node Packages
```
cd alumni-recommendation-data-scrapper
npm install
```

## Add cookie.json
```
vim cookie.json
```
```
{
    "name": "li_at",
    "value": "<ADD YOUR li_at cookie from linkedin>",
    "domain": "www.linkedin.com",
    "expirationDate": 1677074701.981261,
    "sameSite": "no_restriction",
    "secure": true
}
```

## Custom
- update index.js inside dataset accordingly


## Run Script
```
cd Dataset
node index.js | tee log.txt
```

