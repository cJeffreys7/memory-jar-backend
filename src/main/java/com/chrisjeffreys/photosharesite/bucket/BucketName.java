package com.chrisjeffreys.photosharesite.bucket;

public enum BucketName {

    PROFILE_IMAGE("memory-jar-memories");

    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}
