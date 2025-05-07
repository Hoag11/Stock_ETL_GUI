# Stock ETL Pipeline Project GUI

This project is the website for Stock ETL Pipeline https://github.com/Hoag11/stock-ETL-pipeline
## Prerequisites

Make sure you have the following installed before you begin:

- [Node.js](https://nodejs.org/) (for the frontend)
- [Maven](https://maven.apache.org/) (for the backend)
- [Astronomer](https://www.astronomer.io/docs/astro/cli/overview) (for running the Pipeline)

## Getting Started

Follow the steps below to get the project up and running.

### 1. Clone the ETL repository

```bash
git clone https://github.com/Hoag11/stock-ETL-pipeline.git
cd stock-ETL-pipeline
astro dev start
```
### 2. Clone the repository
```bash
git clone https://github.com/Hoag11/monthaykhanh
cd front-end
npm dev run
```
Open another terminal
```bash
cd back-end
mvn spring-boot:run
```

### Notes: When run the first time, uncomment `#spring.profiles.active=dev` on /back-end/src/main/resources/application.properties and start backend to have sample data, then you can comment it again 
