# frontm Rest API Nodejs
## Steps to run the server
```
npm i
npm start
```

## GET request to obtain list of products
```
http://localhost:3000/api/foods?page=1&limit=5&sortBy=itemName&orderBy=1&costMin=100&costMax=1000&filter=dosa
```

## POST request to place a order
json
```
[
	{
		"foodItem": "5f406baef3d87610ed2f9419",
		"itemCount": 1
	},
	{
		"foodItem": "5f3ef9340c0e9f70246e8de0",
		"itemCount": 1
	},
	{
		"foodItem": "5f3ef74a1bd4da6fc4d94a91",
		"itemCount": 1
	}
]
```
``` 
http://localhost:3000/api/orders
```