import { useCallback, useState } from 'react';
import { File, Paths } from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useAppDispatch } from '../../../store/hooks';
import { markSavedLocally } from '../../../store/generateSlice';
import { markGenerationSaved } from '../../../store/historySlice';

// Extract the base64 payload from a data URI produced by imageGen.service.
function dataUriToBase64(dataUri: string): { base64: string; ext: string } {
  const [header, base64] = dataUri.split(',');
  const mime = header.match(/data:(image\/\w+)/)?.[1] ?? 'image/png';
  const ext = mime.split('/')[1] ?? 'png';
  return { base64, ext };
}

export function useSaveImage() {
  const dispatch = useAppDispatch();
  const [saving, setSaving] = useState(false);
  const [savedUri, setSavedUri] = useState<string | null>(null);

  const saveImage = useCallback(
    async (generationId: string, imageUrl: string) => {
      setSaving(true);
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') throw new Error('Media library permission denied');

        const { base64, ext } = dataUriToBase64(imageUrl);
        const fileName = `ai-image-${generationId}.${ext}`;
        const file = new File(Paths.document, fileName);

        // Write the base64-encoded image bytes to the document directory
        await file.write(base64, { encoding: 'base64' } as Parameters<typeof file.write>[1]);

        await MediaLibrary.saveToLibraryAsync(file.uri);

        dispatch(markSavedLocally());
        dispatch(markGenerationSaved({ id: generationId, localUri: file.uri }));
        setSavedUri(file.uri);
      } finally {
        setSaving(false);
      }
    },
    [dispatch],
  );

  return { saveImage, saving, savedUri };
}
