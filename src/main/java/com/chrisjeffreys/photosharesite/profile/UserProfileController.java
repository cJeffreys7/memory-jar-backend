package com.chrisjeffreys.photosharesite.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("jars/upload")
@CrossOrigin("*")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping
    public List<UserProfile> getUserProfiles() {
        return userProfileService.getUserProfiles();
    }

    @PostMapping(
            path="{jarId}/memories",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void uploadUserProfileImage(@PathVariable("jarId") String jarId,
                                       @RequestParam("file") MultipartFile file) {
        userProfileService.uploadUserProfileImage(jarId, file);
    }

    @GetMapping("{userProfileId}/image/download")
    public byte[] dowloadUserProfileImage(@PathVariable("userProfileId") UUID userProfileId) {
        return userProfileService.downloadUserProfileImage(userProfileId);
    }
}
