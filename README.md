# TVARA
TVARA or, "The Very Awesome Recipe App", is a web app that is meant to find recipes based off a users preferences and restrictions.  

Build out the UI
[ ] Search bar
[ ] Diet drop-down bar
[ ] Text-field for ingredients to exclude
[ ] Cards for recipe returns
[ ] Make site responsive

Adding new API to site
[ ] look at new APIs that are food-related
[ ] add it to program

Trying to get Kroger API to work
[ ] 

Integrate one API (Spoonacular) into the UI
Integrate another API (Zestful???) into the UI
Find CSS API that is not Bootstrap (try CSS)


Kroger API Notes

client_id tvara-9ab12f9c57100cf9251796bc21028ea23803929742703015782
encoded client_id: dHZhcmEtOWFiMTJmOWM1NzEwMGNmOTI1MTc5NmJjMjEwMjhlYTIzODAzOTI5NzQyNzAzMDE1Nzgy

client_secret lJKaAHc0LnVgKOlxuhTj1iaQblwUhl00rzE8J2Nj
encoded client_secret: bTEzcHIxd2tVS1RUc01Kel9FclVIZUlSVm5ZNmtWTHdITG0tWHFMcA==

Cart (Public): cart.basic:write
Products (Public): product.compact

Grant Type: authorization_code, client_credentials, refresh_token


curl -X POST \
  'https://api.kroger.com/v1/connect/oauth2/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Authorization: Basic {{base64(dHZhcmEtOWFiMTJmOWM1NzEwMGNmOTI1MTc5NmJjMjEwMjhlYTIzODAzOTI5NzQyNzAzMDE1Nzgy:bEpLYUFIYzBMblZnS09seHVoVGoxaWFRYmx3VWhsMDByekU4SjJOag==)}}' \
  -d 'grant_type=client_credentials' \
  --compressed


curl -X POST \
  'https://api.kroger.com/v1/connect/oauth2/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Authorization: Basic {{(tvara-9ab12f9c57100cf9251796bc21028ea23803929742703015782:lJKaAHc0LnVgKOlxuhTj1iaQblwUhl00rzE8J2Nj)}}' \
  -d 'grant_type=client_credentials' \
  --compressed

// API linking authorization code
curl -X POST \
  'https://api.kroger.com/v1/connect/oauth2/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Authorization: Basic dHZhcmEtOWFiMTJmOWM1NzEwMGNmOTI1MTc5NmJjMjEwMjhlYTIzODAzOTI5NzQyNzAzMDE1NzgyOmxKS2FBSGMwTG5WZ0tPbHh1aFRqMWlhUWJsd1VobDAwcnpFOEoyTmo=' \
  -d 'grant_type=client_credentials' \
  --compressed

// Access Token???
{"expires_in":1800,"access_token":"eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ0dmFyYS05YWIxMmY5YzU3MTAwY2Y5MjUxNzk2YmMyMTAyOGVhMjM4MDM5Mjk3NDI3MDMwMTU3ODIiLCJleHAiOjE2NjU2MjUwMDgsImlhdCI6MTY2NTYyMzIwMywiaXNzIjoiYXBpLmtyb2dlci5jb20iLCJzdWIiOiIzOWFjYjNiMS1kYTI3LTUwYTMtYTVhNC01OGMwZTY4ZTA3ZjQiLCJzY29wZSI6IiIsImF1dGhBdCI6MTY2NTYyMzIwODUyMDMzOTc1MywiYXpwIjoidHZhcmEtOWFiMTJmOWM1NzEwMGNmOTI1MTc5NmJjMjEwMjhlYTIzODAzOTI5NzQyNzAzMDE1NzgyIn0.tNPEHbv2BhA7ttmNE22CJdfXAdpq6cdAwfkSWNc72vtpTEh9yBK2py_KyhtTbv-iRehppGY7Ojv2TEDLX_VDAbwm3f-eCkI5EUF3JePEEUTwqp7MCJ2u4L6P21KoaQt1g_gvLmf0_QeldB2D837EMcspSLxgHyTdcg1FZHTT6-U5iiJylEMjfJOB1qHa9DTmBzpqgv8tCEX5zNgD53TeG2wq6Qzi9d9zehK6tFlMhowm2UVxzpYzMzxz9CyMREPYA5q321dZf9Aaa2nCxhz4V-O8ap1ztMvgf2pLWr58CPQT2KN1tuchdcmMOIIv1GRkeUQIIUVshGRqCNCSP6NhSA","token_type":"bearer"}Alexs-MacBook-Pro-2:TVARA alexcook$

// Product Search API authorization
curl -X GET \
  'https://api.kroger.com/v1/products?filter.term=milk' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer ZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXByZFNJNkltaDBkSEJ6T2k4dllYQnBMbXR5YjJkbGNpNWpiMjB2ZGpFdkxuZGxiR3d0YTI1dmQyNHZhbmRyY3k1cWMyOXVJaXdpYTJsa0lqb2lXalJHWkROdGMydEpTRGc0YVhKME4weENOV00yWnowOUlpd2lkSGx3SWpvaVNsZFVJbjAuZXlKaGRXUWlPaUowZG1GeVlTMDVZV0l4TW1ZNVl6VTNNVEF3WTJZNU1qVXhOemsyWW1NeU1UQXlPR1ZoTWpNNE1ETTVNamszTkRJM01ETXdNVFUzT0RJaUxDSmxlSEFpT2pFMk5qVTJNalV3TURnc0ltbGhkQ0k2TVRZMk5UWXlNekl3TXl3aWFYTnpJam9pWVhCcExtdHliMmRsY2k1amIyMGlMQ0p6ZFdJaU9pSXpPV0ZqWWpOaU1TMWtZVEkzTFRVd1lUTXRZVFZoTkMwMU9HTXdaVFk0WlRBM1pqUWlMQ0p6WTI5d1pTSTZJaUlzSW1GMWRHaEJkQ0k2TVRZMk5UWXlNekl3T0RVeU1ETXpPVGMxTXl3aVlYcHdJam9pZEhaaGNtRXRPV0ZpTVRKbU9XTTFOekV3TUdObU9USTFNVGM1Tm1Kak1qRXdNamhsWVRJek9EQXpPVEk1TnpReU56QXpNREUxTnpneUluMC50TlBFSGJ2MkJoQTd0dG1ORTIyQ0pkZlhBZHBxNmNkQXdma1NXTmM3MnZ0cFRFaDl5QksycHlfS3lodFRidi1pUmVocHBHWTdPanYyVEVETFhfVkRBYndtM2YtZUNrSTVFVUYzSmVQRUVVVHdxcDdNQ0oydTRMNlAyMUtvYVF0MWdfZ3ZMbWYwX1FlbGRCMkQ4MzdFTWNzcFNMeGdIeVRkY2cxRlpIVFQ2LVU1aWlKeWxFTWpmSk9CMXFIYTlEVG1CenBxZ3Y4dENFWDV6TmdENTNUZUcyd3E2UXppOWQ5emVoSzZ0RmxNaG93bTJVVnh6cFl6TXp4ejlDeU1SRVBZQTVxMzIxZFpmOUFhYTJuQ3hoejRWLU84YXAxenRNdmdmMnBMV3I1OENQUVQyS04xdHVjaGRjbU1PSUl2MUdSa2VVUUlJVVZzaEdScUNOQ1NQNk5oU0E='
  --compressed

https://api.kroger.com/v1/connect/oauth2/eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ0dmFyYS05YWIxMmY5YzU3MTAwY2Y5MjUxNzk2YmMyMTAyOGVhMjM4MDM5Mjk3NDI3MDMwMTU3ODIiLCJleHAiOjE2NjU2MjUwMDgsImlhdCI6MTY2NTYyMzIwMywiaXNzIjoiYXBpLmtyb2dlci5jb20iLCJzdWIiOiIzOWFjYjNiMS1kYTI3LTUwYTMtYTVhNC01OGMwZTY4ZTA3ZjQiLCJzY29wZSI6IiIsImF1dGhBdCI6MTY2NTYyMzIwODUyMDMzOTc1MywiYXpwIjoidHZhcmEtOWFiMTJmOWM1NzEwMGNmOTI1MTc5NmJjMjEwMjhlYTIzODAzOTI5NzQyNzAzMDE1NzgyIn0.tNPEHbv2BhA7ttmNE22CJdfXAdpq6cdAwfkSWNc72vtpTEh9yBK2py_KyhtTbv-iRehppGY7Ojv2TEDLX_VDAbwm3f-eCkI5EUF3JePEEUTwqp7MCJ2u4L6P21KoaQt1g_gvLmf0_QeldB2D837EMcspSLxgHyTdcg1FZHTT6-U5iiJylEMjfJOB1qHa9DTmBzpqgv8tCEX5zNgD53TeG2wq6Qzi9d9zehK6tFlMhowm2UVxzpYzMzxz9CyMREPYA5q321dZf9Aaa2nCxhz4V-O8ap1ztMvgf2pLWr58CPQT2KN1tuchdcmMOIIv1GRkeUQIIUVshGRqCNCSP6NhSA