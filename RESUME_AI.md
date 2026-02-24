---
name: Yuri Olive
label: Lead Data and GenAI Engineer | AWS & Azure Certified | McKinsey Alumni
email: "morse-nutmeg-bash@duck.com"
phone: ""
url: https://yuriolive.com
image: assets/profile-picture.jpg
profiles:
  - network: linkedin
    username: yuriolive
    url: https://www.linkedin.com/in/yuriolive
  - network: github
    username: yuriolive
    url: https://github.com/yuriolive
  - network: calendly
    username: yuriolive
    url: https://calendly.com/yuriolive
summary: |
  Lead Data and GenAI Engineer with over 8 years of experience architecting scalable data pipelines and AI/ML solutions. Proven track record of managing data infrastructures for organizations of up to **tens of thousands** employees and handling data volumes exceeding **terabytes**. Expert in modernizing ELT frameworks, building agentic AI applications, and utilizing cloud-native architectures to drive operational efficiency.

location:
  city: "Jundiaí"
  countryCode: BR
  region: "São Paulo"
  country: "Brazil"

skills:
  - name: Programming Languages
    keywords: [Python, SQL, TypeScript, React, Scala]
  - name: Databases & Storage
    keywords: [Snowflake, BigQuery, MongoDB, Cassandra, PostgreSQL, MS SQL]
  - name: Data Tools
    keywords: [Airflow, dbt, Airbyte, Kafka, Spark, Databricks, Scrapy, Meltano]
  - name: Cloud
    keywords:
      [
        AWS,
        Azure,
        Google Cloud,
      ]
  - name: ML & GenAI Frameworks
    keywords: [LangGraph, LangChain, LangSmith, Kedro, Spark MLLib]
  - name: Testing
    keywords: [Pytest, Vitest]
  - name: Infrastructure & Ecosystem
    keywords: [Terraform, GitHub Actions, CloudFormation, Cursor, Claude]
  - name: Others
    keywords: [Docker, Kubernetes, CI/CD]

education:
  - institution: UNICAMP - Universidade Estadual de Campinas (ranked top 3 LatAm)
    area: BSc, Computer Engineering
    studyType: Bachelor
    startYear: 2013
    endYear: 2018

certificates:
  - name: AWS Certified Solutions Architect – Associate
  - name: Azure Data Engineer Associate (Microsoft)
  - name: Modernizing Data Lakes and Data Warehouses with GCP

# Experience will be parsed from the Markdown below
---

# EXPERIENCE

## Lead Data and GenAI Engineer @ Correlation One (correlationone.com)

_April 2023 – Present_

- **Engineered** an agentic chatbot using **LangGraph** and integrated **LangSmith** for tracing and observability, empowering business owners to autonomously navigate and query complex company data without waiting for data analysts.
- **Modernized** the company's GenAI development ecosystem and standardized production environments by implementing **Cursor** with custom `.cursorrules`, **Claude** skills, and AI-assisted code reviews to accelerate deployment cycles and reduce failure rates.
- **Built** and deployed comprehensive data monitoring and observability workflows to ensure high data quality and pipeline reliability across the organization.
- **Spearheaded** the redesign of legacy data pipelines using dockerized Meltano and Scrapy workflows running on Airflow, resulting in **days** of reduction in infrastructure maintenance time and improvement in data reliability.
- **Architected** a custom data extraction solution for Slack to bypass 2FA and high-cost API limitations, saving the company **200k USD** per year in operational costs.
- **Developed** a robust data pipeline for Survey Monkey Apply Resume collection, implementing request-bypass logic that successfully processed **tens of thousands** resumes without hitting service limits.
- **Integrated** the Expert App and Grading Service databases into a centralized BigQuery warehouse, enabling 50+ internal stakeholders to access real-time performance metrics via dbt, improving training performance by **10%** and saving the company **more than 100k USD** per year in operational costs.
- **Reduced** BigQuery costs by **more than 50%** by optimizing BigQuery editions and storage billing models, transitioning to auto-scaling slots, and implementing custom logic in dbt to select the best slot for each query.

## Staff Data Engineer @ Authority.Org (authority.org)

_December 2021 – February 2023_

- **Led** the construction of an end-to-end data pipeline using **dbt** and **Snowflake**, consolidating **~100s** disparate data sources into a single source of truth for university evaluations.
- **Orchestrated** complex workflows using **Airflow** and **Kubernetes**, supporting a network of 5 context-rich websites (100k+ monthly active users) and improving their data-refresh frequency by **quarterly to daily**.
- **Improved** Google organic ranking for primary web assets by implementing a dimensionally modeled data structure that served context-rich metadata via a TypeScript GraphQL API seamlessly integrated with **React** frontends.

## Lead Data Engineer @ TRACTIAN (tractian.com)

_July 2021 – December 2021_

- **Restructured** AWS cloud infrastructure and security using Terraform for **more than 10k** active sensors, preventing an estimated **48** hours of potential downtime.
- **Decoupled** Python and NodeJS microservices using Apache Kafka (AWS MSK), enabling real-time processing of millions of events per second for predictive maintenance ML models.
- **Developed** interactive data visualization components using **React** to display real-time sensor telemetry and predictive maintenance alerts for internal monitoring tools.

## Data Engineer @ McKinsey & Company (mckinsey.com)

_February 2020 – July 2021_

- **Optimized** an e-commerce recommendation pipeline using Databricks (Scala/Spark) for **Casas Bahia** (a major Brazilian retailer), resulting in a **1.8%** increase in client revenue, totaling **millions of BRL**.
- **Engineered** a recommendation platform for a global shrimp producer using Kedro, Airflow and Bigquery in GCP, increasing average product size by **40%** while reducing feed costs by **20%**.
- **Designed and implemented** client-facing dashboards using **React** to visualize machine learning model outputs and data engineering workflows, bridging the gap between complex data and actionable business insights.
- **Resolved** critical production data issues for an industrial vessel fleet from Japan, ensuring 100% on-time delivery of data reports and avoiding potential financial penalties of **thousands of USD**.

## Data Specialist @ Stone (stone.co)

_May 2019 – February 2020_

- **Constructed** a scalable BigQuery Data Lake, reducing average query execution times from several days to **minutes** for the finance department.
- **Migrated** a legacy SQL Server warehouse to Snowflake, moving **more than 1 TB** of financial data while applying Kimball principles to improve cross-departmental reporting speed.

## Data Engineer @ Big Data Brasil (bdtech.ai)

_June 2018 – May 2019_

- **Engineered** a serverless data acquisition infrastructure on AWS (Lambda, SQS, S3) using Infrastructure-as-Code (CloudFormation), supporting the secure ingestion of **more than 100k** records daily.
- **Refactored** high-availability Python (Scrapy) web scrapers, increasing data collection success rates by **30%** across thousands of distinct public and private data sources.

## Software Developer Intern / DBA @ Dolphin Enterprises Ltd (https://www.dolphinent.com/)

_September 2017 – May 2018_

- **Optimized** MS SQL Server stored procedures and migrated on-premise databases to **Azure SQL Elastic Pools**, resulting in a **20%** improvement in application responsiveness and **0** downtimes.
- **Developed** a remote investor portal using **VB.NET (ASP.NET MVC 5)** and Entity Framework, providing secure data access to **more than 200** external stakeholders.

## Software Engineer Intern @ Odysci (odysci.com)

_June 2015 – August 2015_

- **Developed** Machine Learning algorithms for sentiment analysis and e-commerce search using **Java**, improving search relevance for user-generated content.
- **Automated** social media monitoring workflows for the Odysci Media Analyzer platform, reducing manual data processing time by hours per week.