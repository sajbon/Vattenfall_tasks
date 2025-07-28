# Bckend tasks


## Integrate with FrontendApplication <span id="json-content-BE-1"></span>

<details>
<summary>Expand details</summary>

### Description
The goal of this task is to connect FE angular app to our API Service.
### Expected outcome
We should be able to fetch data from my local env backend.

### Technical Details

* SetUp application to see swagger UI
* Adjust fronted to integrate with you backend app running locally

<details>
    <summary>Proposed problem solving process </summary>
    <p class="hint">
* analyze code on How DataTransferObjects are mapped to the ApplicationLayer of the system. Inside ReactorMapper class
</p>
</details>
</details>

## Upload reactor images <span id="json-content-BE-2"></span>

<details>
<summary>Expand details</summary>

### Description
The goal of this task is to prepare your local server and feed it with data.
### Expected outcome
We should be able to get base64 strings from and API endpoint. 

### Technical Details

* Use ImageController with swagger API UI /api/Image/upload-reactor/{id}
* Analyze if {id} parameter is required
* Use seeded ReactorEntity Ids from your local database (  try SQLManagementStudio :)   )

</details>



## Adjust ReactorList api endpoint <span id="json-content-BE-3"></span>

<details>
<summary>Expand details</summary>

### Description
The goal of this task is to return whole set of data from GET api endpoint.
### Expected outcome
GET Endpoint in our swagger UI should return full set of data.

### Technical Details

* Extend `ReactorMapper` class
* this class is responsible for mapping objects between Entity and DTO ( Data Transfer Object )

<details>
    <summary>Proposed problem solving process </summary>
    <p class="hint">
* analyze code on How DataTransferObjects are mapped to the ApplicationLayer of the system. Inside `ReactorMapper` class
</p>
</details>
</details>



## Create new endpoint to fetch ReactorLocations <span id="json-content-BE-4"></span>

<details>
<summary>Expand details</summary>

### Description
The goal of this task is to create new endpoint in ReactorController.
### Expected outcome
GET Endpoint in our swagger UI should return specific set of ReactorLocations.
This is needed to adjust ReactorLocations on google map

### Technical Details

* Extend `ReactorController` class
* Create `ReactorLocationEntity` with FK for ReactorEntity
* Extend `ReactorMapper` class

<details>
    <summary>Feature creation proposed: </summary>
    <p class="hint">

* Create `ReactorLocationEntity` in application `DbContext`

* Create `ReactorLocationDTO` in `PowerPuffBE.Model`

* Create `ReactorLocationRepository` in `DataLayer`

* Create `ReactorLocationService`

* Add endpoint to `ReactorController`

</p>
</details>
</details>


## Reactor Statuses <span id="json-content-BE-5"></span>

<details>
<summary>Expand details</summary>

### Description
The goal of this task is to assign reactor status based on seeded data.

### Expected outcome
GET Endpoint in our swagger UI should return specific set of ReactorLocations.
This is needed to adjust ReactorLocations on google map

### Technical Details

* Extend `ReactorMapper` class
* Create `ReactorStatusProvider` with proper status indication


</details>
