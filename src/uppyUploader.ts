import {
    Dashboard,
    AwsS3
} from "uppy";
const Uppy = require('@uppy/core')

const Uploader = ({
    closeDrawer,
    resourceType,
    maxFiles,
    shouldCreatePhotoToVideo,
    whitedListedImages,
    whitedListedVideos,
    openUploader,
    clickBrowse,
    uppyConfig,
    AWSConfig,
    imageDimensions,
    createPhotoToVideo,
    closeUploader,
    callback,
    setUppyInstance,
    minNumberOfImages = 1,
    minNumberOfVideos = 1,
    maxFileSize
}: {
    closeDrawer?: Function,
    resourceType: string,
    maxFiles: number,
    shouldCreatePhotoToVideo: Boolean,
    whitedListedImages: Array < string > ,
    whitedListedVideos: Array < string > ,
    openUploader: Function,
    clickBrowse: Function,
    AWSConfig: {url: string, token: string}
    callback: Function,
    imageDimensions?: Function,
    closeUploader?: Function,
    createPhotoToVideo?: Function,
    uppyConfig: any
    setUppyInstance: Function,
    minNumberOfImages?: number,
    minNumberOfVideos?: number,
    maxFileSize?: number
}) => {
    closeDrawer && closeDrawer();
    const isVideo = resourceType === "VIDEO";
    const allowedFileTypes = isVideo ? whitedListedVideos : whitedListedImages;
    const MFS = maxFileSize ? maxFileSize : isVideo ? 1000 * 1000 * 100 : 1000 * 1000 * 10;
    const maxNumberOfFiles = maxFiles;
    const minNumberOfFiles = isVideo || !shouldCreatePhotoToVideo ? minNumberOfVideos : minNumberOfImages;
    openUploader();
    setTimeout(() => clickBrowse(), 200);
    const uppy = Uppy({
        debug: true,
        autoProceed: false,
        restrictions: {
            maxFileSize: MFS,
            maxNumberOfFiles,
            minNumberOfFiles,
            allowedFileTypes,
        },
    });
    setUppyInstance(uppy)
    uppy.use(Dashboard, uppyConfig).use(AwsS3, {
        getUploadParameters(file: any) {
            console.log({file});
            
            const url = AWSConfig.url;
            const token = AWSConfig.token;
            // Send a request for signed url.
            return fetch(url, {
                    method: "post",
                    headers: {
                        accept: "application/json",
                        "content-type": "application/json",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        filename: file.name,
                        contentType: file.type
                    })
            })
            .then(response => {
                console.log({response});
                
                return response.json();
            })
            .then(data => {
                console.log({data});
                let urlSplit = data.data.resourceUrl.split("/");
                let imageId = urlSplit[urlSplit.length - 1].split(".")[0];
                imageDimensions && imageDimensions(imageId, file, false);
                return {
                    method: "PUT",
                    url: data.data.uploadUrl,
                    fields: [],
                    headers: {}
                };
            });
        }
    });
    uppy.on("complete", (result: { successful: any[]; }) => {
        result.successful.forEach(result => {
          callback(result);
        });
        if (!isVideo && shouldCreatePhotoToVideo) {
          createPhotoToVideo();
        }
        uppy.close();
        closeUploader && closeUploader();
      });
};

export default Uploader;