const convertBase64ToImage = (base64String: string) => {
    // Check if the base64 string starts with a data URL prefix
    if (!base64String.startsWith('data:image')) {
      // If it doesn't, add a generic image data URL prefix
      base64String = `data:image/png;base64,${base64String}`;
    }

    return base64String;
}

export default convertBase64ToImage;