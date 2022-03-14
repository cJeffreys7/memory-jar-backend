package com.chrisjeffreys.photosharesite.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ComparisonOperator;
import com.amazonaws.services.dynamodbv2.model.Condition;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.chrisjeffreys.photosharesite.bucket.BucketService;
import com.chrisjeffreys.photosharesite.datamodel.MemoryJar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class MemoryJarRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;
    private BucketService bucketService;

    public MemoryJarRepository(DynamoDBMapper dynamoDBMapper, BucketService bucketService) {
        this.dynamoDBMapper = dynamoDBMapper;
        this.bucketService = bucketService;
    }

    public MemoryJar saveJar(MemoryJar jar) {
        dynamoDBMapper.save(jar);
        return jar;
    }

    public MemoryJar getJarById(String jarId) {
        return dynamoDBMapper.load(MemoryJar.class, jarId);
    }

    public List<MemoryJar> getJarsByViewer(String username) {
        Map<String, AttributeValue> userId = new HashMap<String, AttributeValue>();
        userId.put(":username", new AttributeValue().withS(username));
        final List<MemoryJar> jars = dynamoDBMapper.scan(MemoryJar.class,
                new DynamoDBScanExpression()
                        .withFilterExpression("contains(viewers, :username)")
                        .withExpressionAttributeValues(userId));
        if (jars == null) {
            System.out.println("No jars met search criteria");
            return Collections.emptyList();
        } else {
            System.out.println("Found jars that met search criteria: " + jars.size());
            for (MemoryJar jar : jars) {
                System.out.println("Jar that met search criteria: " + jar.getTitle());
            }
            return jars;
        }
    }

    public String deleteJar(String jarId) {
        MemoryJar jar = dynamoDBMapper.load(MemoryJar.class, jarId);
        dynamoDBMapper.delete(jar);
        return "Jar deleted!";
    }

    public MemoryJar updateJar(String jarId, MemoryJar jar) {
        dynamoDBMapper.save(jar,
                new DynamoDBSaveExpression()
                        .withExpectedEntry("jarId",
                                new ExpectedAttributeValue(
                                        new AttributeValue().withS(jarId)
                                )));
        return jar;
    }
}
