# cookies-accepted
simple vanilla javascript popup to accept cookies
Originally developed by @milanffm (https://github.com/milanffm/cookies-accepted)
This a bit updated version with the same functionality 
## Why update
- Avoiding vars, function n global namespace
- Add example for a different language i.e. en
- more modular approach

## How to Use it
- simply add the main.js file to your page
- set the default language to your preferred language and add/update the text/labels i18n.[your_preferred_language]
- for multilingual pages, add properties to i18n for all variants, set lang.switchFromURL = true and add a switch [lang: regex] to switches array

## Further development
- as all the configurable options are saved in just one variable, this can be exposed to an API, which will allow clients to ovewrite it.
- Instead of creating DOM elements, we can use template, which will be rendered using the values from option. Templating would allow the cients to customize the who UI.




