## Redux Action Creator

***APOLOGY*** : there was a problem with previous versions as i published them for testing purposes only.

Now everything is working as expected.

**SOON !**

-   I will add a gitHub repository in case you have recommendations or found bugs or any other feedback.
-   I will provide a better documentation as well as clearer explanation of how to best utilize this toolkit in your projects
-   More features will be added as well

## The Kit

The purpose of this package is to provide a uniform-interface across the app and an easy way to handle dispatching actions in redux, especially the ones that are asynchronous and/or include side-effects like making API requests. Nevertheless, it is NOT mandatory to make API requests if you don't want to. In fact, almost all the properties that are set in the dataObject are optional, except for the "dispatch" method and the "actionType". Yes, you are right ! you can use this package to also dispatch plain synchronous actions. The other properties on the dataObject are there to use at will, if you need them of course.

`This actionCreator utility is designed to handle even the most complex and intricate of redux actions' scenarios or architectures as well as chained actions.`

**You can dispatch *multiple actions* or even *multiple action-creators* within a single action-creator.**

This action creator utility handles setting the state in the redux store automatically so that you don't need to worry about it; this is handled when you pass the "actionType" that you have specified in the reducer.

## Example:


#### Complete Example

```javascript

import axios from "axios";
import { useDispatch } from "react-redux";
import { Kit } from "redux-ac-creator";
const handleApiSuccess = props => {};
const handleApiErrors = e => {};
const dispatch = useDispatch();
const dataObject = {
	axios,
	handleApiSuccess,
	handleApiErrors,
	method: ``,
	url: ``,
	config: {},
	body: {},
	actionType: "",
	payload: {},
	beforeFnSync: props => {},
	beforeFnAsync: async props => {},
	afterFnSync: props => {},
	afterFnAsync: async props => {}
};
const exampleFunction = async () => {
	const response = await dispatch(Kit.actionCreator(dataObject));
};

```


#### Imports

```javascript

import axios from "axios";
import { useDispatch } from "react-redux";
import { Kit } from "redux-ac-creator";

/*
handleApiSuccess()
handleApiErrors()

you can either:

1. Define them headers
2. Import them from another module
3. Omit them both and not include
	 any of them in the dataObject
*/

// if defined or imported

const handleApiSuccess = props => {
	console.log(props); // return or do what you want
};
const handleApiErrors = e => {
	console.log(e); // return or do what you want
};


```


#### dataObject

```javascript

// Add the properties that you need ONLY

const dataObject = {
	axios,
	handleApiSuccess,
	handleApiErrors,
	// axios related data:
	method: "get" /* any valid http method; eg. "get" "post" */,
	url: "/route",
	config: {
		/* add any valid axios config you like */
		headers: { "Content-Type": "application/json" }
	},
	body: {} /* body object to send with the request */,
	// redux action related data:
	actionType: "",
	payload: {},
	/*
	  payload to be fed to any of the functions below
	  NOT action payload
	*/
	// functions to be executed if defined here
	beforeFnSync: props => {
		// synchronous function that runs Before the API call
		// its return is "res1"
		/*
			has access to all the props
			defined in the dataObject
		 */
		console.log(props); // to see all props
	},
	beforeFnAsync: async props => {
		// asynchronous function that runs Before the API call
		// its return is "res2"
		/*
			has access to all the props
			defined in the dataObject and
			the return of 'beforeFnSync'
		 */
		console.log(props); // to see all props
	},
	afterFnSync: props => {
		// synchronous function that runs After the API call
		// its return is "res3"
		/*
			has access to all the props
			in the dataObject and the return of
			'beforeFnSync', 'beforeFnAsync' and 'API request'
		 */
		console.log(props); // to see all props
	},
	afterFnAsync: async props => {
		// asynchronous function that runs After the API call
		// its return is "res4"
		/*
			has access to all the props
			in the dataObject and the return of
			'beforeFnSync', 'beforeFnAsync', 'API request',
			and 'afterFnSync'
		 */
		console.log(props); // to see all props
	}
};

```

#### Dispatching Action Creator

```javascript

// *** calling the action creator in an async environment
const exampleFunction = async () => {
	// If you don't need the return value
	await dispatch(Kit.actionCreator(dataObject));
	/*
		if handleApiSuccess() handleApiErrors()
		are defined: the return of the dispatch will
		be their return values defined above
	*/
	//  if you need the return object
	const response = await dispatch(Kit.actionCreator(dataObject));
};
// *** calling the action creator in a sync environment
dispatch(Kit.actionCreator(dataObject));


```
