# Homingos UI SDK 
### `A plug n' play toolkit`
![Homingos SDK CI](https://github.com/homingos/ui-sdk/workflows/Homingos%20UI%20SDK%20CI/badge.svg)
![Homingos SDK CD](https://github.com/homingos/ui-sdk/workflows/Homingos%20UI%20SDK%20CD/badge.svg)
## What's in the box?
##### - Media Uploader powered by [Uppy](https://uppy.io/) - A js file uploader
#### - More coming soon.

## Installtion 
#### - Yarn
```sh
yarn add @tap0212/homingos-ui-sdk
```
#### - NPM
```sh
npm i @tap0212/homingos-ui-sdk
```
## How use?
### - Media uploader
##### - Import
.
```sh
import HomingosSDk from "@homingos/ui-sdk"
or 
const HomingoSDK = require("@homingos/ui-sdk")
```

#### - USAGE
##### - Config
```sh
`closeDrawer`: <Function> Function to close drawer [optional]
`resourceType`: < String : ['video', 'image'] > Type of resource to upload
`maxFiles`: <Number> Number of maximim files to allow.
`shouldCreatePhotoToVideo`: <Boolean> Allow photo to video (something we use internally)
`whiteLiastedImages`: < Array: [".jpg", ".jpeg", ".png"] > Array of image type to allow,
`whiteListedVideos`: < Array: [".mov", ".mp4"] > Array of video type to allow,
`openUploader`: <Function> Function to open uploader on invoke,
`clickBrowse`: <Function> Function to click browse to automatically open the uploader,
`createPhotoToVideo` <Function> Function to create photo to video (something we use internally)
`uppyConfig`: <Object> Uppy uploader config,
`AWSConfig: <Object: {url: <string>, token: <string>}> URL to make request on in order to get the pre-signed url and token to be passed as auth header.
`closeUploader` : <Function> Function to close the uppy uploader after upload completion automatically.
``` 
.

````sh
    HomingosSDk.Uploader({
        closeDrawer: parent.closeDrawer,
        resourceType,
        maxFiles,
        shouldCreatePhotoToVideo: createPhotoToVideo,
        whitedListedImages: [".jpg", ".jpeg", ".png"],
        whitedListedVideos: [".mov", ".mp4"],
        openUploader: parent.openUploader,
        clickBrowse: parent.clickBrowse,
        uppyConfig: {
          proudlyDisplayPoweredByUppy: false,
          inline: true,
          target: ".UppyUploadContainer",
          replaceTargetContent: true,
          showProgressDetails: true,
          note: messageNote,
          height: "90vh",
          metaFields: [{ id: "name", name: "Name", placeholder: "file name" }],
          browserBackButtonClose: true
        },
        AWSConfig: { 
          url: `${process.env.BASE_URL}/v2/user/post/getPostSignedUrl`,
          token: parent.token},
        imageDimensions: parent.imageDimensions,
        createPhotoToVideo: parent.createPhotoToVideo,
        closeUploader: parent.closeUploader,
        callback
      })
````