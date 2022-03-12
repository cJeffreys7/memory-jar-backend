package com.chrisjeffreys.photosharesite.filestore;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.chrisjeffreys.photosharesite.bucket.BucketName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class FileStore {

    private final AmazonS3 s3;

    @Autowired
    public FileStore(AmazonS3 s3) {
        this.s3 = s3;
    }

    public void saveFile(String path,
                     String fileName,
                     Optional<Map<String, String>> optionalMetadata,
                     InputStream inputStream) {
        ObjectMetadata metadata = new ObjectMetadata();
        optionalMetadata.ifPresent(map -> {
            if (!map.isEmpty()) {
                // Method reference for concise refactor
                map.forEach(metadata::addUserMetadata);
                // map.forEach((key, value) -> metadata.addUserMetadata(key, value));
            }
        });
        try {
            s3.putObject(path, fileName, inputStream, metadata);
        } catch (AmazonServiceException e) {
            throw new IllegalStateException("Failed to store file to s3", e);
        }
    }

    public byte[] downloadFile(String path, String key) {
        try {
            S3Object object = s3.getObject(path, key);
            S3ObjectInputStream inputStream = object.getObjectContent();
            return IOUtils.toByteArray(inputStream);
        } catch (AmazonServiceException | IOException e) {
            throw new IllegalStateException("Failed to download file from s3", e);
        }
    }

    public Boolean deleteFile(String bucket, String file) {
        try {
            s3.deleteObject(bucket, file);
            System.out.println(file + " deleted!");
            return true;
        } catch (AmazonClientException e) {
            System.out.println("Failed to delete s3 file " + file + ": " + e.getMessage());
            return false;
        }
    }

    public Boolean deleteFilepath(String bucket, String filepath) {
        try {
            // Operation for retrieving all files
//            ListObjectsV2Result result = s3.listObjectsV2(bucket);
//            List<S3ObjectSummary> objects = result.getObjectSummaries();
//            for (S3ObjectSummary os : objects) {
//                System.out.println("* " + os.getKey());
//            }
            System.out.println("Folder path: " + filepath);
            ListObjectsV2Result results = s3.listObjectsV2(bucket, filepath);
            List<S3ObjectSummary> objects = results.getObjectSummaries();
            for (S3ObjectSummary os : objects) {
                System.out.println("Deleting " + os.getKey());
                deleteFile(bucket, os.getKey());
            }
            System.out.println("Finished deleting files from " + filepath);
            return true;
        } catch (AmazonServiceException e) {
            throw new IllegalStateException("Failed to delete s3 filepath " + filepath, e);
        }
    }
}
