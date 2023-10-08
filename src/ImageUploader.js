import React, { useState } from 'react';

function ImageUploader() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageLink, setImageLink] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);

        // Créez un objet FormData pour préparer le fichier pour le téléchargement
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Remplacez 'your-backend-url' par l'URL de votre serveur backend
            const response = await fetch('your-backend-url/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                // Supposons que votre backend renvoie un objet avec un champ 'link'
                setImageLink(result.link);
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {imageLink && (
                <div>
                    <p>Your image link: <a href={imageLink} target="_blank" rel="noopener noreferrer">{imageLink}</a></p>
                </div>
            )}
        </div>
    );
}

export default ImageUploader;
