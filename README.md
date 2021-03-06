# Vite Vue Cypress Code Coverage Example

This template should help get you started developing with Vue 3 in Vite and collecting code coverage from your Cypress tests.

This repo has been initialized by running `npm init vue@latest` with the following options:

✔ Add TypeScript? … No
<br />
✔ Add JSX Support? … No
<br />
✔ Add Vue Router for Single Page Application development? … Yes
<br />
✔ Add Pinia for state management? … Yes
<br />
✔ Add Vitest for Unit Testing? … No
<br />
✔ Add Cypress for both Unit and End-to-End testing? … Yes
<br />
✔ Add ESLint for code quality? … Yes
<br />
✔ Add Prettier for code formatting? … No

## Coverage
This repo has been set up to allow collecting coverage from running against the dev server as well as running against the preview server (using the built dist files).

There is nuance and complexity to this I'll cover below.

### Collecting coverage from dev server
It can be nice to collect coverage from you dev server as it will allow you to quickly update your code and see coverage metrics.

* Run `npm run dev` your terminal.
* This should start the server on `http://localhost:4173`
* In another terminal window, run `npm run test:dev:e2e:ci`. This will collect coverage for your e2e tests.
  * This will generate coverage for the following files:
    * src/App.vue
    * src/main.js
    * src/components/HelloWorld.vue
    * src/components/TheWelcome.vue
    * src/components/WelcomeItem.vue
    * src/components/icons/IconCommunity.vue
    * src/components/icons/IconDocumentation.vue
    * src/components/icons/IconEcosystem.vue
    * src/components/icons/IconSupport.vue
    * src/components/icons/IconTooling.vue
    * src/router/index.js
    * It does not generate coverage for UnusedComponent.vue since it is not used in the app
* Alternatively, you can run `npm run test:dev:component:ci`.
  * This will generate coverage for the following files:
    * HelloWorld.vue
    * UnusedComponent.vue - Since there is a component test for this, coverage is generated
* You can run `npm run test:dev:ci` to get a combined e2e and component test coverage report against your dev server code.
  * This will generate coverage for the following files:
    * src/App.vue
    * src/main.js
    * src/components/HelloWorld.vue
    * src/components/TheWelcome.vue
    * src/components/WelcomeItem.vue
    * src/components/UnusedComponent.vue - This is combined from the coverage report for the component type tests
    * src/components/icons/IconCommunity.vue
    * src/components/icons/IconDocumentation.vue
    * src/components/icons/IconEcosystem.vue
    * src/components/icons/IconSupport.vue
    * src/components/icons/IconTooling.vue
    * src/router/index.js

#### Dev Server Coverage Notes
* By running `npm run test:dev:ci` or `npm run test:dev:e2e:ci` or `npm run test:dev:component:ci`, it will generate a *__nyc_output__* folder and *__coverage__*  folder
* The *__coverage__*  folder will contain the coverage data
  * The *__coverage__* data can also be generated by running `npm run test:dev:e2e` or `npm run test:dev:component` and then running the tests in the Cypress GUI, however the coverage data from this is not combined as when you run `npm run test:dev:ci`.
  * If you run `npm run test:dev:e2e` and then run `npm run test:dev:component`, your coverage report from the component test will overwrite the coverage report from the e2e test.
  * If you run `npm run test:dev:component` and then run `npm run test:dev:e2e`, it seems vite reloads based on changes to the coverage directory and has issues causing the e2e tests to fail out. If you know how to fix this, feel free to send a PR.
* To collect coverage from the dev server, it requires the `forceBuildInstrument` option in vite-istanblu-plugin to be `false`.
* To collect coverage from the preview server which uses the built dist files, you need to set the `forceBuildInstrument` option to `true`. More details on this can be found in the `vite.config.js` file.
* If you do not run the dev server first in another terminal window and then try to run `npm run test:dev:ci` or `npm run test:dev:e2e:ci` or `npm run test:dev:component:ci`, it will fail with the following message:

  ```
  Cypress could not verify that this server is running:

  > http://localhost:4173

  We are verifying this server because it has been configured as your baseUrl.

  Cypress automatically waits until your server is accessible before running tests.

  We will try connecting to it 3 more times...
  ```

## Collecting coverage from preview server
* You can run `npm run test:dist:e2e` to collect component coverage from you dist/built files.
  * The `test:dist:e2e` npm script includes a call to `npm run instrument-build` that will run `vite build` with istanbul instrumentation turned on via the `INSTRUMENT_BUILD=true` env variable
  * TODO - Figure out why this doesn't collect from all tested files
  * This will generate coverage for the following files:
    * src/main.js
    * src/router/index.js
  * It should actually generate coverage for the following files:
    * src/App.vue
    * src/main.js
    * src/components/HelloWorld.vue
    * src/components/TheWelcome.vue
    * src/components/WelcomeItem.vue
    * src/components/icons/IconCommunity.vue
    * src/components/icons/IconDocumentation.vue
    * src/components/icons/IconEcosystem.vue
    * src/components/icons/IconSupport.vue
    * src/components/icons/IconTooling.vue
    * src/router/index.js
  * It seems like with vite doing code-splitting on the built dist files, Vite only parses the code files loaded by the tests, which should be all of the above, but for some reason is not the case.
    * I've tried the following to fix this:
      * Adding the following to the vite.config.js file to try and disable code-splitting based on [this comment](https://github.com/cypress-io/code-coverage/issues/539#issuecomment-1096699032). Unfortunately, this did not work.
      ```js
      build: {
        rollupOptions: {
          output: {
            manualChunks: () => 'bundle',
          }
        }
      }
      ```
      * Importing `src/main.js` into a test` based on [this comment](https://github.com/cypress-io/code-coverage/issues/539#issuecomment-1026220372). Unfortunately, this did not work.
      ```js
      build: {
        rollupOptions: {
          output: {
            manualChunks: () => 'bundle',
          }
        }
      }
      ```
      Errors out with the following message:
      ```
      Error: Webpack Compilation Error
      ./src/router/index.js 19:50
      Module parse failed: Unexpected token (19:50)
      ```

* You can run `npm run test:dist:component` to collect component coverage from you dist/built files.
  * The `test:dist:component` npm script includes a call to `npm run instrument-build` that will run `vite build` with istanbul instrumentation turned on via the `INSTRUMENT_BUILD=true` env variable
  * This will generate coverage for the following files:
    * HelloWorld.vue
    * UnusedComponent.vue
* You can run `npm run test:dist:ci` to collect component and e2e coverage from you dist/built files.
  * TODO - Figure out why this doesn't collect from all tested files. This is likely the same root issue with `npm run test:dist:e2e`
  * This will generate coverage for the following files:
    * src/main.js
    * src/components/UnusedComponent.vue
    * src/router/index.js

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
