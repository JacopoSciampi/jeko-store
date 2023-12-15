# JekoStore

![badge_ts] ![badge_angular]  ![badge_yarn]

A tool to cache requests data.

# Usage

Use the library's interceptor to handle all your requests: 

```typescript
{ provide: HTTP_INTERCEPTORS, useClass: JekoStoreInterceptor, multi: true }
```

Optionally you can also use the `forRoot` method for the initial configuration: 

```typescript
JekoLibModule.forRoot({
    logLevel: 'debug',
    customHeaders: {
        'X_HEADER': 'Lorem Ipsum',
    },
    noCacheRegExp: [/v2/, /auth/]
})
```

`logLevel`: When in `debug` mode will print some info in console.

`customHeaders`: An object containing all the custom headers.

`noCacheRegExp`: an array of `RegExp` patterns that the library will use in order to always request the API data if the match it is successful.

___

## Update headers at runtime

In order to update the headers at runtime you can use the ref class: 

```typescript
JekoStoreRefClass.updateHeaders({
    'x_something': 'Some value',
    'Authentication': 'Bearer AddYourJwtHere'
})
```

___
## No cache request

If the `noCacheRegExp` flag is not useful in your situation, you can always set each request to don't be cached: 

```typescript
const headers = new HttpHeaders().set('x_no_cache', 'true');
this._http.get('<your_url>', { headers }).subscribe();
```

# License
MIT



[badge_ts]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[badge_angular]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[badge_yarn]: https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white

