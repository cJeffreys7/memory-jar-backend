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
import java.util.List;

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

    public List<MemoryJar> getJarsByOwner(String owner) {
        // TODO: Filter by viewers instead of owner
        final List<MemoryJar> jars = dynamoDBMapper.scan(MemoryJar.class,
                new DynamoDBScanExpression()
                        .withFilterConditionEntry("owner",
                        new Condition().withComparisonOperator(ComparisonOperator.EQ)
                                .withAttributeValueList(Collections.singletonList(new AttributeValue(owner)))));
        if (jars == null) {
//            System.out.println("No jars met search criteria");
            return Collections.emptyList();
        } else {
//            System.out.println("Found jars that met search criteria: " + jars.size());
            for (MemoryJar jar : jars) {
//                System.out.println("Jar that met search criteria: " + jar.getTitle());
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
