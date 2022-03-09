package com.chrisjeffreys.photosharesite.bucket;

import com.chrisjeffreys.photosharesite.filestore.FileStore;
import com.chrisjeffreys.photosharesite.profile.UserProfile;
import com.chrisjeffreys.photosharesite.profile.UserProfileDataAccessService;
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
                fileStore.save(path, filename, Optional.of(metadata), file.getInputStream());
                return filename;
            } catch (IOException e) {
                throw new IllegalStateException(e);
            }
        } else throw new IllegalStateException("Invalid file");
    }

    public byte[] downloadUserProfileImage(UUID userProfileId) {
        String path = String.format("%s/%s",
                BucketName.PROFILE_IMAGE.getBucketName(),
                userProfileId);

//        return user.getUserProfileImageLink().map(key -> fileStore.download(path, key))
//                .orElse(new byte[0]);
        return (new byte[0]);
    }
}
