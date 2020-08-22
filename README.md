# frontm Rest API Nodejs
## Steps to run the server
```
npm i
npm start
```

## GET request to obtain list of products
```
http://localhost:3000/api/foods?page=1&limit=5&sortBy=itemName&orderBy=1&costMin=100&costMax=1000&filter=1
```

## POST request to place a order
json
```
[
	{
		"foodItem": "5f408863a0f70d1c21585e12",
		"itemCount": 1
	},
	{
		"foodItem": "5f408863a0f70d1c21585e11",
		"itemCount": 1
	},
	{
		"foodItem": "5f408863a0f70d1c21585e13",
		"itemCount": 1
	}
]
```
``` 
http://localhost:3000/api/orders
```