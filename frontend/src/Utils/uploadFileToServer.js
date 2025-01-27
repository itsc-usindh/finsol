import CallAPI from "./callApi";

export const UploadFileGetUrl = async (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      return 'No file selected!';
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await CallAPI('upload/uploadImage', 'POST', formData, {
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          'Access-Control-Allow-Origin':'*',
          'Authorization': `BEARER ${localStorage.getItem('token')}`,
      });
      
      if (response.filePath) {
        return response.filePath
      }
    } catch (error) {
      console.error('Upload failed', error);
      return ('Upload failed. Please try again. ERROR: ' + JSON.stringify(error));
    }
  };
