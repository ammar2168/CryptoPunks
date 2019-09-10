# CryptoPunks
CryptoPunks is an API server for retrieving information about crypto punks from the crypto punk block chain on ethereum.

#### Project set up

1. ``` brew install node ```

2. ``` git clone git@github.com:ammar2168/CryptoPunks.git ```

3. ``` cd CrptoPunks ```

4. ``` npm install ```

5. ``` npm start```

#### Testing 

Note : Keep the server running and open another tab, from the project root directory run <br />
     ``` npm test ```

#### API's

1. Get punks for sale 

* **Description:** <br />
Returns all punks index’s which are listed for sale

* **URL** <br />
`/api/v1/punks-for-sale/`

* **Method:** <br />
    `GET`

* **Data Params** <br />
None
 
         
* **Success Response:** <br />
   * **Status Code:** 200 <br />
    **Content:** `{
      "punks_for_sale": [
           7990,
           5702,
           9878,
           2819,
           9906
	      ]
    }`

* **Error Response:** <br />
  None

* **Sample Call:**
```
GET /api/v1/punks-for-sale/ HTTP/1.1
Host: localhost:8080
cache-control: no-cache
Postman-Token: b35251a2-2831-4347-b1cd-8543984ef901
```

2. Get punk info

* **Description:** <br />
Returns punk information for a given punk index

* **URL** <br />
`/api/v1/punks/{punkindex}`

* **Method:** <br />
    `GET`

* **Data Params** <br />
None

* **Success Response:** <br />
  * **Status Code:** 200 <br />
    **Content:** <br/> 
  `{	
        	"gender": "Male",
       	 "accessories": [
            		"Knitted Cap",
           		 "Small Shades"
      	  ],
		“owner” : “address”,
        	"punkIndex": "2256",
       	 "isForSale": true,
       	 “forSalePrice": "10000000000000000000 wei"
		“currentBid” : “50000000000000007 wei”   		 
}`

* **Error Response:** <br />
  * **Status Code:** 400 <br />
    **Content:** `{
    "error": "Invalid punk index: '10002', index must be a positive number in the range 0-9999"
}`

* **Sample Call:**
```
GET /api/v1/punk/2256 HTTP/1.1
Host: localhost:8080
cache-control: no-cache
Postman-Token: 09e94ef8-7c59-4c8a-b7c9-4833387cc027
```

