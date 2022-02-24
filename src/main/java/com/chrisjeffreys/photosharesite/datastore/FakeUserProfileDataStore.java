package com.chrisjeffreys.photosharesite.datastore;

import com.chrisjeffreys.photosharesite.profile.UserProfile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class FakeUserProfileDataStore {

    private static final List<UserProfile> USER_PROFILES = new ArrayList<>();

    static {
        USER_PROFILES.add(new UserProfile(
                UUID.fromString("db4870e4-8657-45d9-aa44-2ad1352908f4"),
                "artvandelay",
                null));
        USER_PROFILES.add(new UserProfile(
                UUID.fromString("1f362ac3-d09f-4870-a16c-b4d62241d381"),
                "bobsacamano",
                null));
    }

    public List<UserProfile> getUserProfiles() {
        return USER_PROFILES;
    }

    public UserProfile getUser(UUID userProfileId) {
        return USER_PROFILES.stream()
                .filter(u -> u.getUserProfileId().equals(userProfileId))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException(String.format("User profile %s not found", userProfileId)));
    }
}
