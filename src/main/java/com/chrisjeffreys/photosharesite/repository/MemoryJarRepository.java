package com.chrisjeffreys.photosharesite.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ComparisonOperator;
import com.amazonaws.services.dynamodbv2.model.Condition;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.chrisjeffreys.photosharesite.datamodel.MemoryJar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository
public class MemoryJarRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public MemoryJar save(MemoryJar jar) {
        System.out.println("New Memory Jar: " + jar);
        dynamoDBMapper.save(jar);
        return jar;
    }

    public MemoryJar getJarId(String jarId) {
        return dynamoDBMapper.load(MemoryJar.class, jarId);
    }

    public List<MemoryJar> getJarsByOwner(String owner) {
        System.out.println("Getting jars for " + owner);
        final List<MemoryJar> jars = dynamoDBMapper.scan(MemoryJar.class,
                new DynamoDBScanExpression()
                        .withFilterConditionEntry("owner",
                        new Condition().withComparisonOperator(ComparisonOperator.EQ)
                                .withAttributeValueList(Collections.singletonList(new AttributeValue(owner)))));
        if (jars == null) {
            return Collections.emptyList();
        } else {
            return jars;
        }
    }

    public String delete (String jarId) {
        MemoryJar jar = dynamoDBMapper.load(MemoryJar.class, jarId);
        dynamoDBMapper.delete(jar);
        return "Jar deleted!";
    }

    public String update (String jarId, MemoryJar jar) {
        dynamoDBMapper.save(jar,
                new DynamoDBSaveExpression()
                        .withExpectedEntry("jarId",
                                new ExpectedAttributeValue(
                                        new AttributeValue().withS(jarId)
                                )));
        return jarId;
    }
}
