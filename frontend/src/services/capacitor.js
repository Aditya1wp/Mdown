import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Media } from '@capacitor-community/media';
import { Toast } from '@capacitor/toast';

const showToast = async (text) => {
  if (Capacitor.isNativePlatform()) {
    await Toast.show({ text, duration: 'long' });
  } else {
    console.log(text); // Fallback for web
  }
};

/**
 * Downloads the video from a direct URL and saves it to the gallery
 * if on mobile. Otherwise triggers a regular browser download.
 * Requires Capcitor Filesystem and Media plugins.
 */
export const downloadVideo = async (directUrl, filename = "video.mp4") => {
  // 1. Web Fallback
  if (!Capacitor.isNativePlatform()) {
    showToast('Starting web download...');
    const a = document.createElement('a');
    a.href = directUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  // 2. Mobile Native Save to Gallery
  try {
    showToast('Starting download...');
    
    // Step A: Download to App's temporary Cache/Data Directory
    const tempFileName = `temp_${Date.now()}_${filename}`;
    const result = await Filesystem.downloadFile({
      url: directUrl,
      path: tempFileName,
      directory: Directory.Cache,
    });

    if (!result.path) {
        throw new Error("Failed to download file to app cache.");
    }

    // Step B: Ask for Media Permission
    showToast('Requesting permission to save to Gallery...');
    const permissionStatus = await Media.requestPermissions();
    if (permissionStatus.camera !== 'granted' && permissionStatus.camera !== 'prompt') {
      throw new Error(`Permission not granted to save to gallery. Got: ${permissionStatus.camera}`);
    }

    // Step C: Save to Media Gallery using Capacitor Media plugin
    showToast('Saving to Gallery...');
    // The Media plugin takes a file URI and copies it to the native gallery
    await Media.saveVideo({
        path: Capacitor.convertFileSrc(result.path), // Provide the absolute URI
        album: 'Video Vault'
    });

    showToast(`Successfully saved ${filename} to Gallery!`);

    // Step D: Cleanup the temporary file from Cache
    await Filesystem.deleteFile({
        path: tempFileName,
        directory: Directory.Cache
    });

  } catch (error) {
    console.error('Download error:', error);
    showToast(`Failed to download: ${error.message}`);
    throw error;
  }
};
