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

TVARA - 1

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


// Access Token
curl -X POST \
  'https://api.kroger.com/v1/connect/oauth2/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Authorization: Basic dHZhcmEtOWFiMTJmOWM1NzEwMGNmOTI1MTc5NmJjMjEwMjhlYTIzODAzOTI5NzQyNzAzMDE1NzgyOmxKS2FBSGMwTG5WZ0tPbHh1aFRqMWlhUWJsd1VobDAwcnpFOEoyTmo=' \
  -d 'grant_type=client_credentials&scope=product.compact'


// Product Search API authorization
curl -X GET \
  'https://api.kroger.com/v1/products?filter.term=milk' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ0dmFyYS05YWIxMmY5YzU3MTAwY2Y5MjUxNzk2YmMyMTAyOGVhMjM4MDM5Mjk3NDI3MDMwMTU3ODIiLCJleHAiOjE2NjYwNDA2MTQsImlhdCI6MTY2NjAzODgwOSwiaXNzIjoiYXBpLmtyb2dlci5jb20iLCJzdWIiOiIzOWFjYjNiMS1kYTI3LTUwYTMtYTVhNC01OGMwZTY4ZTA3ZjQiLCJzY29wZSI6InByb2R1Y3QuY29tcGFjdCIsImF1dGhBdCI6MTY2NjAzODgxNDE3NzYyNTQ5MSwiYXpwIjoidHZhcmEtOWFiMTJmOWM1NzEwMGNmOTI1MTc5NmJjMjEwMjhlYTIzODAzOTI5NzQyNzAzMDE1NzgyIn0.nx9Loly9f72AVOQZeMIlhJacj26OEVa62gd3QlGmKigeXcDrRu8QMDRPPjJUdQ08FXnU3Wztf_PoYAflEyDCZWgWzX0eB7boFoYNDym8QWKfiupqANRHK8uhQQKimyptx4DZw-RctG-INzRRP1JpowsYHyQtqX1wNCwFqY9i4fMGXF-b0gRc-hin6i2lqC7LbbmJxEhLbAVkxRT439E9ldvfyID4JGmj-JOT7Z2n3kN0ecnBkYtJBFmCyu2Je5sxFkayAqiUX3HQ46UG3syCmdCMHAp0SUYqPdNoilo0-ybd66BpCMz3xUGj0H8ZS1izmJyQPUwHOwtuMovlA7Ypow'
  --compressed


curl -X GET \
  'https://api.kroger.com/v1/products/0001111041700?filter.locationId={{LOCATION_ID}}' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ0dmFyYS05YWIxMmY5YzU3MTAwY2Y5MjUxNzk2YmMyMTAyOGVhMjM4MDM5Mjk3NDI3MDMwMTU3ODIiLCJleHAiOjE2NjYwNDIwNTAsImlhdCI6MTY2NjA0MDI0NSwiaXNzIjoiYXBpLmtyb2dlci5jb20iLCJzdWIiOiIzOWFjYjNiMS1kYTI3LTUwYTMtYTVhNC01OGMwZTY4ZTA3ZjQiLCJzY29wZSI6InByb2R1Y3QuY29tcGFjdCIsImF1dGhBdCI6MTY2NjA0MDI1MDAwOTM4NjE2MCwiYXpwIjoidHZhcmEtOWFiMTJmOWM1NzEwMGNmOTI1MTc5NmJjMjEwMjhlYTIzODAzOTI5NzQyNzAzMDE1NzgyIn0.HEZe_Mm89k0Tl9a2d6gbuAHM4P9-jLn3EP3AmNxY0YnGK9e2dtNhpEuPJdmkgdMGR0DRgjBbX1mwDXTwt02t3zr5JjjLHZWdx-gOWuPy3P3krir4uwQ9FlviM8V-3Cr_wcJ4csZhdHlgIZnlMj8DxKWZ6_9ROGUb4CHT23GHXbKCPcqD0F4_gWX9zBKVjn-dQiwQ2Kp0SveRd-nbB2wn-O9IwMOGqyyqA4ybPaw2kAKAwqjg31V0BoAC5Lz6xdTjhKiH2oq3W54uYrHB2owX5aMhM_cyCAXY6os8jqPmfztjk2BWAXaSd1Z7cEjUUxhSrhO-SA6HLoas0xEQaV2ghQ'


------------

TVARA - 2

client_id: tvara2-722d70ff89d515fd435bc8909c964cf55847317557410057397

client_secret: tQN5KRypd7da2RITkt0SN71VZz-EKB6umm824SC5

encoded: dHZhcmEyLTcyMmQ3MGZmODlkNTE1ZmQ0MzViYzg5MDljOTY0Y2Y1NTg0NzMxNzU1NzQxMDA1NzM5Nzp0UU41S1J5cGQ3ZGEyUklUa3QwU043MVZaei1FS0I2dW1tODI0U0M1


// API linking authorization code
curl -X POST \
  'https://api.kroger.com/v1/connect/oauth2/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Authorization: Basic dHZhcmEyLTcyMmQ3MGZmODlkNTE1ZmQ0MzViYzg5MDljOTY0Y2Y1NTg0NzMxNzU1NzQxMDA1NzM5Nzp0UU41S1J5cGQ3ZGEyUklUa3QwU043MVZaei1FS0I2dW1tODI0U0M1' \
  -d 'grant_type=client_credentials' \
  --compressed


// Access Token
curl -X POST \
  'https://api.kroger.com/v1/connect/oauth2/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Authorization: Basic dHZhcmEyLTcyMmQ3MGZmODlkNTE1ZmQ0MzViYzg5MDljOTY0Y2Y1NTg0NzMxNzU1NzQxMDA1NzM5Nzp0UU41S1J5cGQ3ZGEyUklUa3QwU043MVZaei1FS0I2dW1tODI0U0M1' \
  -d 'grant_type=client_credentials&scope=product.compact'