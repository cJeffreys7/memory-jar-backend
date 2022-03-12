package com.chrisjeffreys.photosharesite.bucket;

import com.amazonaws.AmazonClientException;
import com.chrisjeffreys.photosharesite.filestore.FileStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class BucketService {

    private final FileStore fileStore;

    @Autowired
    public BucketService(FileStore fileStore) {
        this.fileStore = fileStore;
    }

    public String uploadMemoryFile(String jarId, MultipartFile file) {
        // 1. Check if image is not empty
        // 2. If file is an image (TODO: Test if Video can be accepted)
        // 3. Grab some metadata from file if any
        // 4. Store the image in s3 and update DB with s3 image link
        if (!file.isEmpty() && file.getContentType().contains("image")) {
            System.out.println("Valid image file");

            Map<String, String> metadata = new HashMap<>();
            metadata.put("Content-Type", file.getContentType());
            metadata.put("Content-Length", String.valueOf(file.getSize()));

            String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), jarId);
            String filename = String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());

            try {
                fileStore.saveFile(path, filename, Optional.of(metadata), file.getInputStream());
                return filename;
            } catch (IOException e) {
//                throw new IllegalStateException(e);
                return "ERROR" + e.getMessage();
            }
        } else throw new IllegalStateException("Invalid file");
    }

    public byte[] downloadMemoryFile(String jarId, String filename) {
        String path = String.format("%s/%s",
                BucketName.PROFILE_IMAGE.getBucketName(),
                jarId);
        final Optional<String> bucketFilename = Optional.ofNullable(filename);
        return bucketFilename.map(key -> fileStore.downloadFile(path, key)).orElse(new byte[0]);
    }

    public Boolean deleteFile(String jarId, String filename) {
        String bucket = BucketName.PROFILE_IMAGE.getBucketName();
        String file = String.format("%s/%s",
                jarId,
                filename);
        return fileStore.deleteFile(bucket, file);
    }

    public Boolean deleteFilepath(String filepath) {
        String bucket = BucketName.PROFILE_IMAGE.getBucketName();
        return fileStore.deleteFilepath(bucket, filepath);
    }
}
