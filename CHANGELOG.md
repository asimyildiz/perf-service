# CHANGELOG

## History

### v1.0.1 (CURRENT RELEASE)

* Next version that includes handling of bulk metric data
* `#9` : Add new route and new services to handle saving bulk data
* `#10`: Update and add new tests

### v1.0.0 (PREVIOUS RELEASE)

* Initial version that has an express server and mongoose
* `#0` : Add express to handle service requests
* `#1` : Add mongoose to handle storing of data into database
* `#2` : Add all tests

## Feature

### v1.0.1 (23.06.2021) (NEXT RELEASE)

* Add deployment to Amazon
* `#3` : Add forever script and configure it
* `#4` : Add a docker image
* `#5` : Deploy to Amazon ECS with ECR
* `#6` : Add jsdoc package and run it

### v1.0.2 (26.06.2021) (NEXT RELEASE)

* Add list methods to return saved values
* `#7` : Add a list method that will return a list of metrics for a session for an url that supports paging

### v1.1.0 (30.06.2021) (NEXT RELEASE)

* Add authentication
* `#8` : Add a jwt token authentication 