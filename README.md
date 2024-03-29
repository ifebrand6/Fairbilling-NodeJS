# ✨ FairBillingLogPulse CLI✨
FairBillingLogPulse is a command-line tool for processing log files related to hosted applications, providing insights into user sessions and facilitating fair billing practices.


## Installation

FairBillingLogPulse requires [Node.js](https://nodejs.org/) v6+ to run.

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/ifebrand6/Fairbilling-NodeJS
cd Fairbilling-NodeJS
yarn add
```

## Usage
Run the  FairBillingLogPulse by `yarn build` followed by providing the path to your log file.
For example:
```sh
yarn build path/to/your/logfile.txt
```
###Alternatively

Run the FairBillingLogPulse CLI `fblogpulse-cli` tool by providing the path to your log file.
Install app as package using `npm install -g .`
For example:
```sh
fblogpulse-cli path/to/your/logfile.txt
```
> Note: `file path` is the only argument required.

## Testing
```sh
yarn test
```
