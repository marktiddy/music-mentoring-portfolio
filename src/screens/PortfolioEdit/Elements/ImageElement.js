import React, { useState, useEffect } from 'react';
import firebase from '../../../data/keys';

const ImageElement = ({ idx, m, updateImage }) => {
  const [localError, setLocalError] = useState(null);
  const [storage] = useState(firebase.storage());
  const [progress, setProgress] = useState(null);
  const [caption, setCaption] = useState(m.imageCaption);
  const [url, setUrl] = useState(m.imageURL);
  const [uploadedFileName, setUploadedFileName] = useState(m.imageName);

  useEffect(() => {
    if (url !== '' && caption !== '') {
      //We have caption and url
      updateImage(idx, url, caption, uploadedFileName);
    } else if (url !== '') {
      //User has updated image but no caption
      updateImage(idx, url, '', uploadedFileName);
    }

    if (!url) {
      //User has removed the image
      updateImage(idx, '', caption, '');
    }
    // //User has only updated the image

    // if (url && caption) {
    //   //Check they don't match the m
    //   updateImage(idx, url, caption, uploadedFileName);
    // } else {
    //   //let's say the user has now removed the image
    //   if (!url) {
    //     updateImage(idx, '', caption, '');
    //   }
    //   if (!caption) {
    //     updateImage(idx, url, '', uploadedFileName);
    //   }
    // }
  }, [url, caption, idx, uploadedFileName, updateImage]);

  //File to upload image
  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setLocalError('You must choose a file');
      return;
    } else if (file.type.split('/')[0] !== 'image') {
      setLocalError('You must choose an image');
      return;
    } else if (file.size > 6600000) {
      setLocalError('Your file must be no larger than 6MB to upload');
      return;
    } else {
      //File is smaller than 6MB, exists and is an image
      setLocalError(null);
      var uploadTask = firebase
        .storage()
        .ref(`portfolio_uploads/${file.name}`)
        .put(file);
      //Start upload
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const updatedProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(updatedProgress);
        },
        (error) => {
          setLocalError('We had a problem uploading your image');
        },
        () => {
          storage
            .ref('portfolio_uploads')
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              setUploadedFileName(file.name);
              //Reset our status etc.
              setProgress(null);
            });
        }
      );
    }
  };

  const removeImage = () => {
    //Create ref to the file if we have the URL
    if (uploadedFileName) {
      var oldRef = firebase
        .storage()
        .ref('portfolio_uploads')
        .child(uploadedFileName);
      oldRef
        .delete()
        .then(() => {
          //file was deleted
          setUrl(null);
          setUploadedFileName(null);
          // updateImage(idx, '', caption, '');
        })
        .catch((e) => console.log(e));
    } else {
      //we need to get the details off the server via the name in the local object
      var previousImage = firebase
        .storage()
        .ref('portfolio_uploads')
        .child(m.imageName);
      previousImage
        .delete()
        .then(() => {
          //Set our states to null
          setUrl(null);
          setUploadedFileName(null);
        })
        .catch((e) => console.log(e));
    }
  };

  const updateCaption = (event) => {
    setCaption(event.target.value);
  };

  return (
    <div
      key={m.question}
      className="tracking-widest font-light text-center m-2 mt-6"
    >
      <div>
        <label className="font-normal">{m.question}</label>
        <label className="text-sm">
          <br /> Choose an image to upload and add a caption
        </label>
      </div>

      <div className="mt-4 text-center">
        {!url ? (
          <label className="w-4/5 btn text-white bg-gray-800 hover:text-gray-800">
            <span>Choose a photo to upload</span>
            <input type="file" className="hidden" onChange={onFileChange} />
          </label>
        ) : (
          <div className="text-center w-full">
            <img
              src={url}
              alt={caption ? caption : 'Portfolio Image'}
              style={{ width: '50%' }}
              className="text-center m-auto"
            />
            <p
              className="btn bg-gray-800 text-white hover:text-gray-800 w-3/5 mx-auto"
              onClick={removeImage}
            >
              Remove Image
            </p>
          </div>
        )}
        {progress ? (
          <div className="shadow w-4/5 bg-gray-200 mx-auto mb-2 mt-8">
            <div
              className="bg-gray-800 text-xs py-1 text-center text-white tracking-widest"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        ) : null}
      </div>
      {localError ? (
        <p className="text-center text-red-800 font-normal tracking-widest text-l mt-3">
          {localError}
        </p>
      ) : null}
      <input
        key={idx + 20}
        placeholder="Add your caption here"
        value={caption}
        onChange={(event) => updateCaption(event)}
        className="w-4/5 bg-gray-200 text-gray-700 border border-gray-700 mt-6 rounded focus:outline-none focus:bg-gray-100 tracking-widest font-light p-2 mt-4 mb-2"
      />
    </div>
  );
};
export default ImageElement;
