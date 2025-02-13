# Using the WPO365 RESTful API for Microsoft Graph

## Change log

- 1.1.0 Added an example how a developer can retrieve a user's profile picture from Microsoft Graph
- 1.0.1 Fixed a type
- 1.0.0 Initial version

## Introduction

This project serves as a simplified example of how you as a developer can develop a Gutenberg Block for WordPress using the wealth of data Microsoft 365 services such as SharePoint Online, OneDrive and Microsoft (Office) Graph make available.

The **WPO365 RESTful API for Microsoft Graph** is good news for developers.

- As a developer you can now build client-side Microsoft 365 apps for WordPress.
- Even better, you can do so in their favorite programming language.
- And last but not least, you can do so without the hassle and complexity of implementing _authentication_ and _authorization_ because the [WPO365 | LOGIN plugin](https://www.wpo365.com/) takes care of all of that.

## Prerequisites

Please make sure that you have installed, activated and configured [WPO365 | LOGIN plugin](https://www.wpo365.com/) >= v13.

## Getting started

The easiest way to get started with your own **WPO365 RESTful API for Microsoft Graph** project is to download the sample project from the [Github repository](https://github.com/wpo365/wpo365-developer).

The sample project, when built, is a plugin that enqueues a Gutenberg Block for WordPress to display the logged-in user's recently viewed documents (but only when the user logged in with Microsoft / Single Sign-On as provided by the [WPO365 | LOGIN plugin](https://www.wpo365.com/)).

**Disclaimer** Please note that the intention of the sample project is to show how easy it is to connect WordPress with Microsoft Graph and the wealth of data in Microsoft 365 with the least amount of code.

### 1. Navigate to your project folder

```cmd
cd projects
```

### 2. Clone our Recent Documents project

```cmd
git clone https://github.com/wpo365/wpo365-developer.git
```

Alternatively you can manually create a folder in your projects directory, navigate to the [github repository](https://github.com/wpo365/wpo365-developer) and download the app instead.

### 3. Install dependencies

Now change into the project directory and run **npm install**.

```cmd
cd wpo365-developer
npm install
```

This will download all the missing packages into the **node_modules** folder, based on the dependencies listed in the **package.json** file that you can find in the root of the project folder.

### 4. Build the project

To build the project simply use the npm run command provided.

```cmd
npm run build
```

This will create the production optimized javascript files in the _dist_ folder.

### 5. Deploy your solution

There is no script to deploy the plugin to your WordPress development environment. However, you can navigate to your WordPress plugin's folder and create new directory for the plugin.

```cmd
md wpo365-developer
```

and copy the following folders / files:

- /dist
- wpo365-developer.php

Then navigate to **WP Admin > Plugins** and activate the **WPO365 | DEVELOPER** plugin to see it in action.

## API Development guidelines

### Enabling the API

Before the API can be used, it must be enabled or else you'll notice that WordPress will respond with a 404 Not Found error. To enable the API go to **WP Admin > WPO365 > Integration** and check the option to _Enable WPO365 API for Microsoft Graph_.

### Add API to list pages freed from authentication

Requests to the API should not be intercepted by the [WPO365 | LOGIN plugin](https://www.wpo365.com/). To achieve this, navigate to **WP Admin > WPO365 > Single Sign-on** and add the path _/wp-json/wpo365/v1/graph_ to the list (click + to add the new entry and then click to save the configuration).

### Inject global dependencies

When a script wants to fetch data from the API it must at least know the absolute address of the API and in most cases also a secret _wp_rest_ nonce that was generated by the WordPress server to be able to authenticate the current logged-in user when a request is made to the API.

In the sample project therefore the block's (front-end) script is enqueued and with it an inline script is added as a dependency.

```php
\wp_add_inline_script( "wpo365-$app-block", 'window.wpo365 = window.wpo365 || {}; window.wpo365.blocks = ' . json_encode( array(
                    'nonce' => \wp_create_nonce( 'wp_rest' ),
                    'apiUrl' => \trailingslashit( \get_option( 'home' ) ) . 'wp-json/wpo365/v1/graph',
                ) ), 'before' );
```

_See wpo365-developer.php._

Now in the script fetching data from the API these global dependency can be used as follows.

```javascript
const nonce = window.wpo365.blocks.nonce
const apiUrl = window.wpo365.blocks.apiUrl

...

fetch(apiUrl + '/me', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; odata=verbose',
    'X-WP-Nonce': nonce,
  },
  ...
})

```

_See src\app.js_

### Choosing an endpoint

The API basically acts as a transparent proxy for Microsoft Graph queries. The endpoints provided therefore are similar to the endpoints provided by Microsoft Graph:

- /me
- /sites
- /drives
- /users
- /groups
- /search

So instead of fetching data from https://graph.microsoft.com/beta/sites data is fetched from https://www.example.com/wp-json/wpo365/v1/graph/sites.

### Submitting a query

The query is not added to the URL - as it is familiar from the Microsoft Graph API - but instead is added to the JSON formatted body e.g.

```javascript
fetch(apiUrl + '/me', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; odata=verbose',
    'X-WP-Nonce': nonce,
  },
  body: JSON.stringify({
    query: 'insights/used?$orderby=LastUsed/LastAccessedDateTime+desc',
  }),
  ...
})
```

_See src\app.js_

### Authentication

To fetch data from the API the script must provide the **X-WP-Nonce** header as mentioned previously. This will enable the API to resolve the currently logged in WordPress user.

### Authorization

To fetch data from the Microsoft Graph API on behalf of the logged-in user the script must provide (in the body of the request) the permission scope for the request e.g. *https://graph.microsoft.com/User.Read.All*. What permission is required can be looked up in the [Microsoft Graph API reference](https://docs.microsoft.com/en-us/graph/api/overview?view=graph-rest-beta).

**Note** Adding a scope doesn't automatically grant those permissions to a user. Instead, corresponding (delegated) API permissions must have been added to the App Registration in Azure AD. Refer to the [WPO365 documentation for Integration](https://docs.wpo365.com/article/23-integration) for details.

### More options

The following list will help to understand the various options when fetching data from Microsoft Graph at the disposal of a developer.

```javascript
{
  /**
   * The data to be posted to Microsoft Graph e.g. { "requests": [ { "entityTypes": [ "message" ], "query": { "queryString": "contoso" } } ] }.
   */
  data: null,

  /**
   * Additional headers to be included when fetching from Microsoft Graph e.g. {consistencylevel: 'eventual'}
   */
  headers: null,

  /**
   * The query string e.g. mainly when reading data e.g. [sites]/wpo365demo.sharepoint.com:/.
   */
  query:
    'insights/used?$orderby=LastUsed/LastAccessedDateTime+desc&$top=' +
    pageSize,

  /**
   * Scope for the permissions needed e.g. https://graph.microsoft.com/Sites.Read.All.
   */
  scope: 'https://graph.microsoft.com/Sites.Read.All',

  /**
   * Whether to use application instead of delegated permissions.
   */
  application: false,

  /**
   * Whether the payload is binary (the result will be an object with exactly one property: { "binary": "[base64 encoded string]"" })
   */
  binary: false,

  /**
   * How to fetch from Microsoft Graph (default: GET).
   */
  method: 'GET',
}
```

_See src\app.js_

### Passing block properties to the script

Note how app.js is a React app that runs completely independent from the Gutenberg block. However, because it is enqueued whenever the Gutenberg block is added to a page and because it is added to the footer of the page, it can be rendered on the DOM element that the block added to the page.

In the sample app the _save_ method of the block serializes the block's properties as data attributes. This in turn allows the app to read those attributes as its properties.

### Tips

- Test you Microsoft Graph queries using the [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer).

### Submit your blocks!

**Get in touch** via [https://www.wpo365.com/contact/](https://www.wpo365.com/contact/)

- If you developed a useful, usable and beautiful Gutenberg block for WordPress that would be interesting for others.
- If you feel that more Microsoft Graph endpoints should be added to the API.
- If you have a question and you are stuck.
