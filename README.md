# GitHub Reports v0.1.0

Explore GitHub contributions

Try it live [http://github-reports.janantala.com](http://github-reports.janantala.com)

<img src="https://raw.github.com/janantala/github-profile/develop/dashboard/app/images/contributions.png" />

## Instructions

### Step 1
- Go to [Google APIs](https://code.google.com/apis/console/). 
- Click **"Create Project"**, if asked. 
- Under **"Services"**, turn on **BigQuery API**.

### Step 2
- Go to [githubarchive:github.timeline table](https://bigquery.cloud.google.com/table/githubarchive:github.timeline) at BigQuery and click **"Query Table"** in the top right corner.
- Paste this query, change **"USERNAME"** to target GitHub username:

```
    SELECT type, created_at FROM [githubarchive:github.timeline]
    WHERE actor = "USERNAME"
```

- Hit **"Run Query"** and **"Download as CSV"**.

### Step 3
- Type GitHub username.
- Select Timezone
- Upload CSV file.

## License

The MIT License

Copyright (c) 2013 Jan Antala, https://github.com/janantala
