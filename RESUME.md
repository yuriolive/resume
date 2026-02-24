---
name: Yuri Olive
label: Lead Data Engineer | AWS & Azure Certified | McKinsey Alumni
email: "yuriso1994@gmail.com"
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
  Lead Data Engineer with over 8 years of experience architecting and operating enterprise-grade data platforms. Deep, hands-on expertise across the modern data stack — **Snowflake**, **dbt**, **Apache Kafka**, **Apache Airflow**, **AWS**, and **PostgreSQL** — spanning batch, streaming, and real-time architectures at scale. Was one of the **first Snowflake users in Brazil** (Stone, 2019) and an early contributor to the **Snowflake Terraform Provider** when it was still maintained by the Chan Zuckerberg Initiative. Architected and led the migration of Tractian's entire data pipeline to **Amazon MSK (Kafka)** — an event-driven architecture that remains in production as the company grew to a $700M+ valuation. Specialized in modernizing data infrastructure, implementing CI/CD, and ensuring platform reliability for high-volume environments.

location:
  city: "Jundiaí"
  countryCode: BR
  region: "São Paulo"
  country: "Brazil"

skills:
  - name: Core Competencies
    keywords: [Data Platform Architecture, Event-Driven Streaming, CI/CD, Dimensional Modeling, DataOps]
  - name: Languages
    keywords: [Python, SQL, TypeScript, Scala]
  - name: Data Warehousing & Databases
    keywords: [Snowflake, BigQuery, PostgreSQL, MongoDB, Cassandra]
  - name: Orchestration & Streaming
    keywords: [Airflow, Kafka, Amazon MSK, Spark Streaming, dbt (Core/Cloud)]
  - name: Infrastructure & Cloud
    keywords:
      [
        AWS (Lambda, SQS, S3, MSK, EC2),
        Azure,
        GCP,
        Terraform,
        Docker,
        Kubernetes,
        GitHub Actions,
      ]
  - name: ML & Analytics
    keywords: [Kedro, Spark MLLib, LangGraph, Databricks]

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

## Lead Data Engineer @ Correlation One (correlationone.com)

_April 2023 – Present_

- **Architected** and operated the core components of a modern data platform, redesigning legacy pipelines using dockerized Meltano and Scrapy (Python) workflows orchestrated on **Apache Airflow** to enforce SLA compliance and improve pipeline reliability end-to-end.
- **Standardized** production environments by implementing Infrastructure-as-Code (**Terraform**) and CI/CD (GitHub Actions), creating a "paved road" for data deployment that significantly reduced failure rates across all teams.
- **Owned** platform observability and cost management on GCP, cutting **BigQuery costs by more than 50%** via auto-scaling slot configurations and custom **dbt** logic, while establishing monitoring and alerting for all critical pipelines.
- **Integrated** diverse data sources (Expert App, Grading Service) into a centralized BigQuery warehouse using **dbt** for transformation and modeling, enabling 50+ stakeholders to access metrics, improving training performance indicators by more than **10%**.
- **Built** a high-volume resume ingestion and enrichment pipeline leveraging **BigQuery ML** and **Gemini** to process and structure tens of thousands of resumes, transforming unstructured documents into queryable candidate profiles and powering downstream matching models.

## Staff Data Engineer @ Authority.Org (authority.org)

_December 2021 – February 2023_

- **Led** the construction of an end-to-end data platform using **Snowflake** and **dbt**, consolidating **~100s** of disparate data sources into a single source of truth using dimensional modeling best practices and **dbt** tests for data quality enforcement.
- **Managed PostgreSQL** transactional databases serving the platform's web applications, handling schema design, query optimization, and replication configuration.
- **Orchestrated** complex workflows using **Airflow** on **Kubernetes**, supporting a network of 5 context-rich websites (100k+ MAU) and increasing data-refresh frequency from **quarterly to daily** — a 90x improvement.
- **Designed** and maintained REST APIs (TypeScript GraphQL) to serve context-rich metadata backed by **Snowflake**, directly improving Google organic ranking for primary web assets.

## Lead Data Engineer @ TRACTIAN (tractian.com)

_July 2021 – December 2021_

- **Architected and led** the full migration of Tractian's data pipeline from REST-to-REST communication to an event-driven streaming architecture using **Apache Kafka** on **Amazon MSK**, decoupling Python and NodeJS microservices and enabling real-time processing of millions of events per second for predictive maintenance ML models. This architecture remains in production today as Tractian grew to a **$700M+ valuation** with offices across the US and Mexico.
- **Restructured** AWS cloud infrastructure and security using **Terraform** for **more than 10k** active IoT sensors, ensuring high availability and preventing an estimated **48** hours of potential downtime.
- **Modeled** and maintained analytical datasets using **dbt** on top of company data, powering BI dashboards and internal operational reports for monitoring multiple KPIs.

## Data Engineer @ McKinsey & Company (mckinsey.com)

_February 2020 – July 2021_

- **Built** and operated a real-time **Kafka**-backed streaming recommendation pipeline using **Spark Structured Streaming** and Databricks for **Casas Bahia**, driving a **1.8%** increase in client revenue (millions of BRL).
- **Engineered** a recommendation platform for a global shrimp producer using Kedro, **Airflow**, and BigQuery on GCP, with **PostgreSQL** as the serving layer, increasing average product size by **40%**.
- **Resolved** critical production data issues for an industrial vessel fleet, ensuring 100% on-time delivery of reports and avoiding financial penalties, demonstrating strong incident response capabilities.

## Data Specialist @ Stone (stone.co)

_May 2019 – February 2020_

- **Pioneered** the adoption of **Snowflake** as one of the **first corporate clients in Brazil**, migrating a legacy SQL Server warehouse — costing $20k+/month — and **more than 1 TB** of financial data while defining best practices for the region. At that time Stone had more than **491k clients**, processing more than **R$129 billions per year (~$40B USD)**. Also contributed to the open-source **Snowflake Terraform Provider** (then maintained by the Chan Zuckerberg Initiative) during this period.
- Migrated legacy ETL pipelines from Microsoft SQL Server Integration Services (SSIS) to **Apache Airflow**, modernizing the orchestration layer and enabling the data team to version-control and iterate on pipelines as code. The new Airflow-orchestrated pipelines loaded data directly into **Snowflake**, with **Alembic** (Python library) managing schema migrations following **Kimball dimensional modeling principles**.

## Data Engineer @ Big Data Brasil (bdtech.ai)

_June 2018 – May 2019_

- **Engineered** a serverless ingestion infrastructure on **AWS** (Lambda, SQS, S3) using Infrastructure-as-Code (CloudFormation), supporting the secure ingestion of **more than 100k** records daily into **PostgreSQL** and S3-backed data stores. Leveraged PostGIS for geo-referential analysis, enabling spatial queries and geographic enrichment of collected datasets.
- **Refactored** high-availability Python (Scrapy) web scrapers and **Airflow** DAGs, increasing data collection success rates by **30%** across thousands of distinct public and private data sources.

## Software Developer Intern / DBA @ Dolphin Enterprises Ltd (dolphinent.com)

_September 2017 – May 2018_

- **Optimized** MS SQL Server stored procedures and migrated on-premise databases to **Azure SQL Elastic Pools**, resulting in a **20%** improvement in application responsiveness and **0** downtimes.
- **Developed** a remote investor portal using **VB.NET (ASP.NET MVC 5)** and Entity Framework, providing secure data access to **more than 200** external stakeholders.

## Software Engineer Intern @ Odysci (odysci.com)

_June 2015 – August 2015_

- **Developed** Machine Learning algorithms for sentiment analysis and e-commerce search using **Java**, improving search relevance for user-generated content.
- **Automated** social media monitoring workflows for the Odysci Media Analyzer platform, reducing manual data processing time by hours per week.
