import styles from './FormInput.module.scss'


function ImageInput({image, setImage, imagePreview, setImagePreview}) {

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return ( 
        <div className={styles.imageUploadContainer}>
                    <label htmlFor="file-upload" className={styles.uploadImage}>
                        Upload Image
                    </label>
                    <input
                        id="file-upload"
                        className={styles.formInputImage}
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                    />

                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Uploaded Preview"
                            className={styles.imagePreview}
                        />
                    )}
                </div>
     );
}

export default ImageInput;