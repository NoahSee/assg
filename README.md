Run in root folder

```bash
docker-compose up
```

Open

```bash
http://localhost:3000
```

Focus was given to the following:

- Working api calls
- Complete dockerisation of frontend, backend, and db

System Design

Frontend

- User can specify hash, start timestamp, end timestamp, page, and results per page
- Basic modified create react app, enough to call the apis and display data

* Unfortunately the timestamp is still a number string, datepicker would take too long
* Using a very basic UI for this case

Backend

- Transaction data and Rate data are stored in mysql db
- Using mysql because it is lightweight for docker applicaion, ideally using timeseries db
- Upon startup, it automatically ingests 1h worth of transaction data quickly so theres something to query

* No API validations and error handling in this scenario

Additional Notes:

Availability

- This is kind of the worst case because its in a docker app. Ideally we want an externally managed db that is setup already before the backend is deployed, and comes with redundancy.

Scalability

- The app is scalable horizonally since it only deals with 1 type of transaction. It can easily be modified and deployed for other types of transactions.

Reliability

- Ive added retries in the parts of the app which greatly benefitted from it, expecially since were doing many api calls at once, some may inadvertently return an error.
