import path from 'path';
import useFirebase from './useFirebase';

/**
 * Custom hook that allows managing files in Firebase Storage
 */
export default function useStorage() {
  const { storage } = useFirebase();

  const upload = async (file, pathPrefix, metadata = undefined) => {
    const filePath = path.join(pathPrefix, file.name);

    return storage
      .ref()
      .child(filePath)
      .put(file, metadata);
  };

  const remove = async filePath => storage.ref().child(filePath).delete();

  const download = async filePath => storage.ref(filePath).getDownloadURL();

  return {
    upload,
    remove,
    download,
  };
}
