package com.chrisjeffreys.photosharesite.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class AmazonConfig {

    //! Needs Environment var to recognize env vars in this config
    @Autowired
    private Environment env;

    @Value("#{environment.s3accesskey}")
    private String awsS3AccessKey;

    @Value("#{environment.s3secretkey}")
    private String awsS3SecretKey;

    @Bean
    public AmazonS3 s3() {
    //  System.out.println("Access key: " + awsS3AccessKey + ", Secret key: " + awsS3SecretKey);
        AWSCredentials awsCredentials = new BasicAWSCredentials(
                awsS3AccessKey,
                awsS3SecretKey
        );

        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withRegion(Regions.US_EAST_2)
                .build();
    }

}
