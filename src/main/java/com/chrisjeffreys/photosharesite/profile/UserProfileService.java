package com.chrisjeffreys.photosharesite.profile;

import com.chrisjeffreys.photosharesite.bucket.BucketName;
import com.chrisjeffreys.photosharesite.filestore.FileStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class UserProfileService {

    private final UserProfileDataAccessService userProfileDataAccessService;
    private final FileStore fileStore;

    @Autowired
    public UserProfileService(UserProfileDataAccessService userProfileDataAccessService,
                              FileStore fileStore) {
        this.userProfileDataAccessService = userProfileDataAccessService;
        this.fileStore = fileStore;
    }

    List<UserProfile> getUserProfiles() {
        return userProfileDataAccessService.getUserProfiles();
    }

    void uploadUserProfileImage(String jarId, MultipartFile file) {
        // 1. Check if image is not empty
        // 2. If file is an image
        // 3. The user exists in our database
        // 4. Grab some metadata from file if any
        // 5. Store the image in s3 and update DB with s3 image link
        if (!file.isEmpty() && file.getContentType().contains("image")) {
            System.out.println("Valid image file");
//            UserProfile user = userProfileDataAccessService.getUser(userProfileId);
//            System.out.println("User Profile ID " + userProfileId + " exists");

            Map<String, String> metadata = new HashMap<>();
            metadata.put("Content-Type", file.getContentType());
            metadata.put("Content-Length", String.valueOf(file.getSize()));

            String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), jarId);
            String filename = String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());

            try {
                fileStore.save(path, filename, Optional.of(metadata), file.getInputStream());
//                user.setUserProfileImageLink(filename);
            } catch (IOException e) {
                throw new IllegalStateException(e);
            }
        } else throw new IllegalStateException("Invalid file");
    }

    public byte[] downloadUserProfileImage(UUID userProfileId) {
        UserProfile user = userProfileDataAccessService.getUser(userProfileId);
        String path = String.format("%s/%s",
                BucketName.PROFILE_IMAGE.getBucketName(),
                userProfileId);

        return user.getUserProfileImageLink().map(key -> fileStore.download(path, key))
                .orElse(new byte[0]);
    }
}
